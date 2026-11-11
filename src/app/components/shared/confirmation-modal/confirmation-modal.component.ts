import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title text-primary">
        <i class="feather icon-help-circle me-2"></i>
        {{ title }}
      </h4>
    </div>
    
    <div class="modal-body">
      <p class="mb-0">{{ message }}</p>
    </div>
    
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="dismiss()">
        <i class="feather icon-x me-1"></i>
        {{ cancelText }}
      </button>
      <button type="button" class="btn btn-primary" (click)="confirm()">
        <i class="feather icon-check me-1"></i>
        {{ confirmText }}
      </button>
    </div>
  `,
  styles: [`
    .modal-header {
      border-bottom: 1px solid #dee2e6;
    }
    .modal-footer {
      border-top: 1px solid #dee2e6;
    }
  `]
})
export class ConfirmationModalComponent {
  @Input() title = 'Confirmar Acción';
  @Input() message = '¿Está seguro de que desea realizar esta acción?';
  @Input() confirmText = 'Sí';
  @Input() cancelText = 'No';

  constructor(public activeModal: NgbActiveModal) {}

  confirm(): void {
    this.activeModal.close(true);
  }

  dismiss(): void {
    this.activeModal.dismiss(false);
  }
}
