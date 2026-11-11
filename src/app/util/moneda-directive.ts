import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appFormatearMiles]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormatearMilesDirective),
      multi: true
    }
  ]
})
export class FormatearMilesDirective implements ControlValueAccessor {
  private onChange = (value: number | null) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const valorActual = input.value;
    const posicionCursor = input.selectionStart || 0;
    
    // Contar comas antes del cursor para ajustar posición
    const comasAntes = (valorActual.slice(0, posicionCursor).match(/,/g) || []).length;
    
    // Formatear el valor
    const valorFormateado = this.formatearValor(valorActual);
    
    // Solo actualizar si el valor cambió
    if (valorFormateado !== valorActual) {
      input.value = valorFormateado;
      
      // Calcular nueva posición del cursor
      const nuevasComasAntes = (valorFormateado.slice(0, posicionCursor).match(/,/g) || []).length;
      const diferenciaComas = nuevasComasAntes - comasAntes;
      const nuevaPosicion = Math.max(0, posicionCursor + diferenciaComas);
      
      // Restaurar posición del cursor
      requestAnimationFrame(() => {
        input.setSelectionRange(nuevaPosicion, nuevaPosicion);
      });
    }
    
    // Emitir valor numérico al formulario
    const numeroParaForm = this.convertirANumero(valorFormateado);
    this.onChange(numeroParaForm);
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    const teclasPermitidas = [
      'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
      'Home', 'End', 'ArrowLeft', 'ArrowRight', 'Clear'
    ];
    
    // Permitir teclas de control y navegación
    if (teclasPermitidas.includes(event.code) || 
        (event.ctrlKey && ['KeyA', 'KeyC', 'KeyV', 'KeyX', 'KeyZ'].includes(event.code))) {
      return;
    }
    
    const char = event.key;
    const currentValue = (event.target as HTMLInputElement).value;
    
    // Solo números y punto decimal
    if (!/[\d.]/.test(char)) {
      event.preventDefault();
      return;
    }
    
    // Control de punto decimal
    if (char === '.' && currentValue.includes('.')) {
      event.preventDefault();
      return;
    }
    
    // Control de decimales (máximo 2)
    const partes = currentValue.split('.');
    if (partes[1] && partes[1].length >= 2) {
      const cursorPos = (event.target as HTMLInputElement).selectionStart || 0;
      const puntoPos = currentValue.indexOf('.');
      
      // Si está escribiendo después del segundo decimal
      if (cursorPos > puntoPos + 2) {
        event.preventDefault();
      }
    }
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor methods
  writeValue(value: number | null): void {
    if (value !== null && value !== undefined) {
      this.el.nativeElement.value = this.formatearNumero(value);
    } else {
      this.el.nativeElement.value = '';
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.el.nativeElement.disabled = isDisabled;
  }

  private formatearValor(valor: string): string {
    // Limpiar: solo números, punto y comas
    let limpio = valor.replace(/[^\d.,]/g, '');
    
    // Dividir en parte entera y decimal
    const partes = limpio.split('.');
    let parteEntera = partes[0].replace(/,/g, '');
    const parteDecimal = partes[1];
    
    // Formatear parte entera con comas
    if (parteEntera && parteEntera !== '0') {
      parteEntera = Number(parteEntera).toLocaleString('en-US');
    } else if (parteEntera === '') {
      parteEntera = '';
    }
    
    // Reconstruir
    if (parteDecimal !== undefined) {
      const decimalLimitado = parteDecimal.slice(0, 2);
      return parteEntera ? `${parteEntera}.${decimalLimitado}` : `.${decimalLimitado}`;
    }
    
    return parteEntera;
  }

  private convertirANumero(valor: string): number | null {
    if (!valor || valor.trim() === '') return null;
    const numeroLimpio = valor.replace(/,/g, '');
    const numero = parseFloat(numeroLimpio);
    return isNaN(numero) ? null : numero;
  }

  private formatearNumero(valor: number): string {
    return valor.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
}