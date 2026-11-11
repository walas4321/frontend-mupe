import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
import { max } from 'moment';

@Component({
  selector: 'show-error',
  standalone: true,
  imports: [],
  templateUrl: './show-error.component.html',
  styleUrl: './show-error.component.scss',
})
export class ShowErrorComponent {
  @Input() mensajeCustomizado: string = '';
  @Input() mensajeRequired!: string;
  @Input() mensajePattern!: string;
  /**
   * Declaración de variables
   */
  readonly errorMessages = {
    required: () => this.mensajeRequired == null ? 'Este campo es requerido.' : this.mensajeRequired,
    minlength: (params: any) => 'El mínimo de caracteres permitido es de ' + params.requiredLength,
    maxlength: (params: any) => 'El máximo de caracteres permitido es de ' + params.requiredLength,
    pattern: () => this.mensajePattern == null ? 'Formato incorrecto.' : this.mensajePattern,
    esmayorhoy: () => 'Fecha ingresada incorrecta',
    esmenorhoy: () => 'Fecha ingresada incorrecta',
    errorformat: () => 'Formato de fecha incorrecta, ingrese valor en el siguiente formato: dd/mm/yyyy',
    fechanoexiste: () => 'Fecha ingresada incorrecta',
    min: () => 'El valor ingresado está por debajo del valor mínimo.',
    soloNumerosEnteros: () => 'Este campo sólo permite números enteros.',
    email: () => 'Formato incorrecto.',
    maxAnio: () => 'El año ingresado no puede ser mayor al año actual.'
  };

  @Input() control: AbstractControlDirective | AbstractControl | null = null;

  /**
   * Función mostrar error.
   * @method shouldShowErrors
   */
  shouldShowErrors() {
    return (
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    );
  }

  /**
   * Función listar errores.
   * @method listOfErrors
   * @returns { string[] } errorList
   */
  listOfErrors(): string[] {
    if (!this.control || !this.control.errors) {
      return [];
    }
    const errors: Object | null = this.control.errors;

    const errorListMensaje: string[] = [];

    if (errors)
      if (this.mensajeCustomizado != '')
        errorListMensaje.push(this.mensajeCustomizado);
      else
        return Object.keys(errors).map((field) =>
          this.getMessage(
            field,
            this.control?.errors != null ? this.control.errors[field] : null
          )
        );

    return errorListMensaje;
  }

  /**
   * Función obtener mensaje.
   * @method getMessage
   * @returns { string } type
   * @returns { any } params
   * @returns { string } mensaje
   */
  private getMessage(type: string, params: any): string {
    let errorMessage: string = '';

    switch (type) {
      case 'required':
        errorMessage = this.errorMessages.required();

        break;

      case 'minlength':
        errorMessage = this.errorMessages.minlength(params);
        break;

      case 'maxlength':
        errorMessage = this.errorMessages.maxlength(params);
        break;

      case 'pattern':
        if (params.requiredPattern == '^[0-9]*$') {
          errorMessage = this.errorMessages.soloNumerosEnteros();
        } else {
          errorMessage = this.errorMessages.pattern();
        }

        break;

      case 'esmayorhoy':
        errorMessage = this.errorMessages.esmayorhoy();
        break;

      case 'esmenorhoy':
        errorMessage = this.errorMessages.esmenorhoy();
        break;

      case 'errorformat':
        errorMessage = this.errorMessages.errorformat();
        break;

      case 'fechanoexiste':
        errorMessage = this.errorMessages.fechanoexiste();
        break;

      case 'min':
        errorMessage = this.errorMessages.min();
        break;

      case 'email':
        errorMessage = this.errorMessages.email();
        break;

      case 'maxAnio':
        errorMessage = this.errorMessages.maxAnio();
        break;
    }

    return errorMessage;
  }
}
