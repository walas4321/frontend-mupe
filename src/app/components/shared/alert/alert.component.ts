import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  NgbToast,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Alerta } from '../../../models';
import { AlertService } from './alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sbn-alert',
  standalone: true,
  imports: [NgbToast, NgbToastModule, CommonModule, NgTemplateOutlet],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  host: { '[class.ngb-toasts]': 'true' },
  providers: [],
})
export class AlertComponent implements OnInit, OnDestroy {
  toasts: Alerta[] = [];
  toastService = inject(AlertService);
  private subscription!: Subscription;

  /**
   * Construcctor de la clase AlertaComponent.
   * @constructor
   */
  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscription = this.toastService.toasts$.subscribe({
      next: (toasts) => {
        this.toasts = toasts;
        this.cdRef.markForCheck();
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Función para identificar la plantilla.
   * @method isTemplate
   * @param { any } toast
   */
  isTemplate(toast: any | null): boolean {
    const response = toast.textOrTpl instanceof TemplateRef;
    return response;
  }

  /**
   * Función para obtener el ícono
   * @method geticon
   * @param { string } clas
   */
  geticon(clas: string | undefined) {
    if (clas != undefined)
      switch (clas.split(' ')[0]) {
        case 'bg-alert-success':
          return 'icon-check-circle';
        case 'bg-alert-warning':
          return 'icon-alert-triangle';
        case 'bg-alert-info':
          return 'icon-info';
        default:
          return 'icon-slash';
      }
    return '';
  }

  /**
   * Función para obtener el título
   * @method getTitulo
   * @param { string } clas
   */
  getTitulo(clas: string) {
    switch (clas.split(' ')[0]) {
      case 'bg-alert-success':
        return 'Mensaje de confirmación';
      case 'bg-alert-warning':
        return 'Mensaje de alerta';
      case 'bg-alert-info':
        return 'Mensaje informativo';
      default:
        return 'Mensaje fallido';
    }
  }
}
