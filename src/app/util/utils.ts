import { AbstractControl } from "@angular/forms";
import { CommonConstants, VariablesIniciales } from "../constant";

export const cerosPadLeft = (value: any, numceros: number) => {
  return ('' + value).padStart(numceros, '0');
};

export const generarSlug = (value: string): string => {
  return value
    .toLowerCase() // Convertir a minúsculas
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/[^\w-]/g, '') // Eliminar caracteres no alfanuméricos ni guiones
    .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
    .trim(); // Eliminar espacios en blanco al principio y al final
};


/**
   * Configura la suscripción a cambios de valor para campos numéricos que necesitan relleno
   * @param control El control del formulario a observar
   * @param longitud La longitud deseada del número rellenado
   */
export const completarConCerosFormReactivo = (control: AbstractControl | null, longitud: number = 8): void => {
  if (!control) return;

  control.valueChanges.subscribe((valor: string) => {
    if (!valor) return;

    const valorLimpio = valor.replace(/^0+/, '');
    const valorRellenado = valorLimpio.padStart(longitud, '0');

    if (valorRellenado !== valor) {
      control.setValue(valorRellenado, { emitEvent: false });
    }
  });
}

/**
 * Parsea una partida con ceros y P al inicio
 * @author SBN
 * @param value 
 * @returns 
 */
export const formatearPartidaConCerosYP = (value: string): string => {
  // Si está vacío, retornar vacío
  if (!value) return '';
  // Remover la P inicial si existe y limpiar caracteres no numéricos
  let numeros = value.replace(/^P/i, '').replace(/[^0-9]/g, '');
  // Si hay más de 8 dígitos, tomar solo los últimos 8
  if (numeros.length > 8) {
    numeros = numeros.slice(-8);
  }
  // Rellenar con ceros a la izquierda hasta tener 8 dígitos
  numeros = numeros.padStart(8, '0');
  // Agregar la P al inicio
  return 'P' + numeros;
};


export const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined;
};

export const isEmptyValue = (value: any) => {
  return isNullOrUndefined(value) || value == VariablesIniciales.EMPTY;
};

export const isNullOrUndefinedToEmpty = (value: any) => {
  return isNullOrUndefined(value) ? CommonConstants.EMPTY : value;
};

export const isNullOrUndefinedToCero = (value: any) => {
  return isNullOrUndefined(value) ? 0.0 : value;
};


/**
 * Formatea fechas para la API a formato ISO string
 * @param fecha - Fecha en cualquier formato compatible
 * @returns String en formato ISO o cadena vacía si es inválida
 */
export const formatearFecha = (fecha: string | any): string => {
  if (!fecha) return '';

  if (typeof fecha === 'string') {
    // Si ya es string, verificar formato
    if (fecha.includes('T')) {
      return fecha; // Ya está en formato ISO
    }
    // Si es formato DD/MM/YYYY, convertir a ISO
    if (fecha.includes('/')) {
      const partes = fecha.split('/');
      if (partes.length === 3) {
        const fechaISO = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}T00:00:00`;
        return fechaISO;
      }
    }
    // Si es formato YYYY-MM-DD, agregar tiempo
    if (fecha?.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return `${fecha}T00:00:00`;
    }
  }

  // Si es objeto Date o similar, convertir a ISO string
  try {
    const fechaObj = new Date(fecha);
    return fechaObj.toISOString();
  } catch (error) {
    console.warn('Error al convertir fecha:', fecha, error);
    return '';
  }
};

export const formatearFechaParaAdapter = (fecha: Date): string => {
  const dia = fecha.getDate().toString().padStart(2, '0');
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
}