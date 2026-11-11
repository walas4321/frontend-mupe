import { Component, Input } from '@angular/core';

@Component({
  selector: 'sbn-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
/**
 * Clase del componente Modal componente.
 *
 * @class ModalComponent
 */
export class LoadingComponent{
	/**
	 * Declaración de variables
	 */
	@Input() message: string | undefined = 'Estamos cargando la información solicitada';
}
