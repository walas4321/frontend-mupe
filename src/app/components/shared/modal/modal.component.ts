import {
	Component,
	Input,
	TemplateRef
} from '@angular/core';
import { Modal } from './modal';
import { ModalConstants } from '../../../constant';
import { LoadingComponent } from '../loading/loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';

@Component({
	selector: 'web-modal',
	standalone: true,
	templateUrl: './modal.component.html',
	imports: [LoadingComponent, NgbModule, NgSwitch, NgIf, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet],
	styleUrls: ['./modal.component.scss'],
})
/**
 * Clase del componente Modal componente.
 *
 * @class ModalComponent
 */
export class ModalComponent{
	/**
	 * Declaración de variables
	 */
	@Input() modal: Modal = ModalConstants.Default;
	@Input() size: string | undefined = void 0;
	@Input() cerrarModal!: (e: MouseEvent) => void | null;
	@Input() aceptarModal!: (e: MouseEvent) => void | null;
	@Input() okActive!: boolean;
	@Input() isLoading!: boolean;
	@Input() childrenCabecera: TemplateRef<any> | null = null;
}
