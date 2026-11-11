import { FormControl, FormGroup, UntypedFormGroup } from "@angular/forms";

declare var $: any;

export class ValidatorService {

  /**
   * @summary Usada para saber si un campo es valido o no
   * @param _field FormControlName ==> campo a validar
   *
   **/
  convertControlToUppercase(control: FormControl): void {
    control.valueChanges.subscribe(value => {
      if (typeof value === 'string' && value !== value.toUpperCase()) {
        control.setValue(value.toUpperCase(), { emitEvent: false });
      }
    });
  }

  convertFormToUppercase(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormControl) {
        this.convertControlToUppercase(control);
      }
    });
  }

  public errorMessage!: string;
  /**
   * @summary Usada para saber si un campo es valido o no
   * @param _field FormControlName ==> campo a validar
   * @param _form FormGroup ==> Formulario al que pertenece el campo a validar
   * @return boolean => true: válido | false = inválido
   */
  public isValid(_field: string, _form: FormGroup): boolean {
    if (_form.get(_field)?.invalid && _form.get(_field)?.touched) {
      if (_form.get(_field)?.errors?.["required"]) {
        this.errorMessage = "El campo es requerido";
        return false;
      }
      if (_form.get(_field)?.errors?.["minlength"]) {
        this.errorMessage = " La cantidad de caracteres debe ser (" + _form.get(_field)?.errors?.["minlength"].requiredLength + ")";
        return false;
      }
      if (_form.get(_field)?.errors?.["maxlength"] && !_form.get(_field)?.errors?.["pattern"]) {
        this.errorMessage = " La cantidad de caracteres no puede ser mayor a (" + _form.get(_field)?.errors?.["maxlength"].requiredLength + ")";
        return false;
      }
      if (_form.get(_field)?.errors?.["pattern"]) {
        this.errorMessage = "Los caracteres ingresados no están permitidos";
        return false;
      }
    }
    return true;
  }

  public validateKeyPress(event: KeyboardEvent, condicion: string) {

    if (condicion == 'numeros') {
      let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
      if (numbers.indexOf(event.key) === -1 && event.key !== 'Backspace') {
        return false;
      }
      return true;
    }

    if (condicion == 'moneda') {
      let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
      if (numbers.indexOf(event.key) === -1 && event.key !== 'Backspace') {
        return false;
      }
      return true;
    }

    if (condicion == 'letrasYcaracteres') {
      if (event.key == 'Enter') {
        return true;
      }
      let letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
        "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z", "Ñ",
        "a", "b", "c", "d", "e", "f", "g", "h", "i",
        "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x", "y", "z", "ñ",
        "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú",
        "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "0", ".", "-", ",", " ", "°", "º", "/", ";",
        "_", "'", "*", ":", "!", "¡", "¿", "?", "\""];

      if (letras.indexOf(event.key) === -1 && event.key !== 'Backspace') {
        return false;
      }
      return true;
    }

    if (condicion == 'soloNumerosYLetras') {
      if (event.key === 'Enter') {
        return true;
      }

      let caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÑñÁÉÍÓÚáéíóú1234567890";

      if (caracteresPermitidos.indexOf(event.key) === -1 && event.key !== 'Backspace') {
        return false;
      }

      return true;
    }
    if (condicion == 'soloNumerosYLetrasYGuion') {
      if (event.key === 'Enter') {
        return true;
      }

      let caracteresPermitidos = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÑñÁÉÍÓÚáéíóú1234567890-";

      if (caracteresPermitidos.indexOf(event.key) === -1 && event.key !== 'Backspace') {
        return false;
      }

      return true;
    }

    if (condicion == 'letras') {
      if (event.key == 'Enter') {
        return true;
      }
      let letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I",
        "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z", "Ñ",
        "a", "b", "c", "d", "e", "f", "g", "h", "i",
        "j", "k", "l", "m", "n", "o", "p", "q", "r",
        "s", "t", "u", "v", "w", "x", "y", "z", "ñ",
        "á", "é", "í", "ó", "ú", "Á", "É", "Í", "Ó", "Ú", " "];

      if (letras.indexOf(event.key) === -1 && event.key !== 'Backspace') {
        return false;
      }
      return true;
    }

    return false
  }

  public isMobile(): boolean {
    const userAgent = navigator.userAgent;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  convertirAMayusculas(valor: string, form: FormGroup, controlName: string): void {
    const control = form.get(controlName);
    if (control && valor) {
      control.setValue(valor.toUpperCase(), { emitEvent: false });
    }
  }


}

