import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ExportConfig {
  titulo: string;
  subtitulo?: string;
  anioRango?: string;
  usuario?: string;
  fecha?: string;
  hora?: string;
}

/**
 * Utilidad para exportar datos a Excel y PDF
 */
export class ExportUtil {
  
  // Logo SBN en base64 - Copiar el contenido del archivo logo-base64-output.txt aquí
  private static readonly LOGO_BASE64 = 'data:image/png;base64,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';
  
  // Ruta del logo en los assets (fallback)
  private static readonly LOGO_PATH = 'assets/images/logo-sbn.png';
  
  /**
   * Exporta datos a Excel con formato personalizado
   * @param data Array de arrays con los datos (incluye encabezados, datos y totales)
   * @param config Configuración del reporte
   * @param nombreArchivo Nombre del archivo sin extensión
   */
  static exportToExcel(
    data: any[][],
    config: ExportConfig,
    nombreArchivo: string
  ): void {
    // Crear un nuevo workbook
    const wb = XLSX.utils.book_new();
    
    // Agregar información de encabezado
    const headerData: any[][] = [];
    
    // Fila 1: Logo y título
    headerData.push(['SBN', '', config.titulo]);
    
    // Fila 2: Sistema Integrado Documentario
    headerData.push(['Sistema Integrado', '', config.anioRango || '']);
    headerData.push(['Documentario', '', '']);
    
    // Fila 4: Usuario y fecha
    const infoRow = ['', '', ''];
    if (config.usuario) {
      infoRow.push(`POR ${config.usuario}`);
    }
    if (config.fecha) {
      infoRow.push(`Fecha: ${config.fecha}`);
    }
    if (config.hora) {
      infoRow.push(`Hora: ${config.hora}`);
    }
    headerData.push(infoRow);
    
    // Líneas vacías
    headerData.push([]);
    headerData.push([]);
    
    // Combinar encabezado con datos
    const fullData = [...headerData, ...data];
    
    // Crear worksheet
    const ws = XLSX.utils.aoa_to_sheet(fullData);
    
    // Configurar el ancho de las columnas
    const maxWidth = Math.max(...data.map(row => row.length));
    const wscols = Array(Math.max(maxWidth, 10)).fill({ wch: 15 });
    wscols[0] = { wch: 10 }; // Año
    wscols[1] = { wch: 25 }; // Estado/Área/Dpto
    wscols[2] = { wch: 30 }; // Título o columna adicional
    ws['!cols'] = wscols;
    
    // Combinar celdas para el título (C1)
    if (!ws['!merges']) ws['!merges'] = [];
    ws['!merges'].push(
      { s: { r: 0, c: 2 }, e: { r: 0, c: Math.max(maxWidth - 1, 5) } }, // Título
      { s: { r: 1, c: 2 }, e: { r: 1, c: Math.max(maxWidth - 1, 5) } }  // Rango años
    );
    
    // Agregar el worksheet al workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Reporte');
    
    // Generar el archivo y descargarlo
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    saveAs(blob, `${nombreArchivo}.xlsx`);
  }

  /**
   * Exporta datos a PDF con formato personalizado
   * @param headers Encabezados de la tabla
   * @param data Datos de la tabla (cuerpo)
   * @param config Configuración del reporte
   * @param nombreArchivo Nombre del archivo sin extensión
   * @param orientation Orientación del PDF
   */
  static exportToPDF(
    headers: string[],
    data: any[][],
    config: ExportConfig,
    nombreArchivo: string,
    orientation: 'portrait' | 'landscape' = 'landscape'
  ): void {
    const doc = new jsPDF(orientation, 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    let yPosition = 15;
    
    // Intentar agregar logo usando múltiples métodos
    this.agregarLogo(doc, yPosition, () => {
      // Continuar con el resto del PDF después de procesar el logo
      this.generarContenidoPDF(doc, headers, data, config, nombreArchivo, pageWidth, yPosition);
    });
  }

  /**
   * Agrega el logo al PDF usando base64 o cargando desde assets
   */
  private static agregarLogo(doc: jsPDF, yPosition: number, callback: () => void): void {
    // Si hay logo en base64, usarlo directamente
    if (this.LOGO_BASE64) {
      try {
        // Ajustar dimensiones para mantener proporción (logo cuadrado aproximadamente)
        doc.addImage(this.LOGO_BASE64, 'PNG', 15, 10, 22, 12);
        console.log('Logo cargado exitosamente desde base64');
        callback();
        return;
      } catch (error) {
        console.error('Error con logo base64:', error);
      }
    }

    // Si no hay base64, intentar cargar desde assets usando fetch
    const logoUrl = `${window.location.origin}/${this.LOGO_PATH}`;
    
    fetch(logoUrl)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const imgData = reader.result as string;
            doc.addImage(imgData, 'PNG', 15, 10, 22, 12);
            console.log('Logo cargado exitosamente desde assets');
          } catch (error) {
            console.error('Error agregando logo:', error);
            this.mostrarFallbackLogo(doc, yPosition);
          }
          callback();
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.warn('No se pudo cargar el logo desde assets, usando fallback:', error);
        this.mostrarFallbackLogo(doc, yPosition);
        callback();
      });
  }

  /**
   * Muestra logo de fallback como texto
   */
  private static mostrarFallbackLogo(doc: jsPDF, yPosition: number): void {
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(200, 0, 0);
    doc.text('SBN', 15, yPosition + 8);
    
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Sistema Integrado', 15, yPosition + 13);
    doc.text('Documentario', 15, yPosition + 16);
  }

  /**
   * Genera el contenido del PDF
   */
  private static generarContenidoPDF(
    doc: jsPDF,
    headers: string[],
    data: any[][],
    config: ExportConfig,
    nombreArchivo: string,
    pageWidth: number,
    yPosition: number
  ): void {
    // Restablecer color a negro
    doc.setTextColor(0, 0, 0);
    
    // Información superior derecha
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const rightX = pageWidth - 15;
    let topY = 15;
    
    if (config.fecha) {
      doc.text(`Fecha: ${config.fecha}`, rightX, topY, { align: 'right' });
      topY += 4;
    }
    if (config.hora) {
      doc.text(`Hora: ${config.hora}`, rightX, topY, { align: 'right' });
    }
    
    // Título principal centrado
    yPosition = 25;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(config.titulo, pageWidth / 2, yPosition, { align: 'center' });
    
    // Rango de años centrado
    if (config.anioRango) {
      yPosition += 7;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(config.anioRango, pageWidth / 2, yPosition, { align: 'center' });
    }
    
    // Información del usuario centrado
    if (config.usuario) {
      yPosition += 6;
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`POR ${config.usuario}`, pageWidth / 2, yPosition, { align: 'center' });
      doc.setTextColor(0, 0, 0);
    }
    
    yPosition += 10;
    
    // Agregar tabla usando autoTable
    autoTable(doc, {
      head: [headers],
      body: data,
      startY: yPosition,
      theme: 'grid',
      headStyles: {
        fillColor: [220, 230, 241],
        textColor: [52, 73, 94],
        fontStyle: 'bold',
        halign: 'center',
        fontSize: 7,
        cellPadding: 2,
        minCellHeight: 8
      },
      bodyStyles: {
        fontSize: 6,
        halign: 'left',
        cellPadding: 1.5
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 10 },     // N°
        1: { halign: 'center', cellWidth: 'auto' }, // OFICIO
        2: { halign: 'left', cellWidth: 'auto' },   // ÁREA
        3: { halign: 'left', cellWidth: 'auto' },   // ADMINISTRADO
        4: { halign: 'center', cellWidth: 20 },     // F.DOC
        5: { halign: 'center', cellWidth: 20 },     // F.CARGO
        6: { halign: 'center', cellWidth: 18 },     // N°CARGO
        7: { halign: 'left', cellWidth: 'auto' },   // N°EXPED
        8: { halign: 'left', cellWidth: 'auto' },   // SOL.ING
        9: { halign: 'left', cellWidth: 'auto' },   // PROCEDIMIENTO
        10: { halign: 'left', cellWidth: 'auto' },  // ASUNTO
        11: { halign: 'left', cellWidth: 'auto' },  // RESPONSABLE
        12: { halign: 'left', cellWidth: 'auto' },  // RPTA
        13: { halign: 'left', cellWidth: 'auto' }   // S.I.RELAC
      },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      margin: { top: 10, right: 8, bottom: 10, left: 8 },
      didDrawPage: (data: any) => {
        // Footer con número de página
        doc.setFontSize(8);
        doc.text(
          `Página ${data.pageNumber}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }
    });
    
    // Guardar el PDF
    doc.save(`${nombreArchivo}.pdf`);
  }
}
