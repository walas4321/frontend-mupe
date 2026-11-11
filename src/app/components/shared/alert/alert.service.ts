import { Injectable } from '@angular/core';
import { Alerta, ErrorDetalleModel } from '../../../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly toastsSubject = new BehaviorSubject<Alerta[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  success(message: string, title?: string) {
    this.show(message, 'bg-alert-success mb-1', 5000, title);
  }

  error(message: string, title?: string, errores?: ErrorDetalleModel[]) {
    this.show(message, 'bg-alert-danger mb-1', 5000, title, errores);
  }

  warning(message: string,  title?: string, errores?: ErrorDetalleModel[]) { 
    this.show(message, 'bg-alert-warning mb-1', 5000, title, errores);
  }

  info(message: string,  title?: string) {
    this.show(message, 'bg-alert-info mb-1', 5000, title);
  }

  show(
    message: string,
    clasname: string,
    delay: number,
    title: string = '',
    errores?: ErrorDetalleModel[]
  ) {
    const currentToasts = this.toastsSubject.getValue();
    currentToasts.push({
      title: title,
      message: message,
      classname: clasname,
      delay: delay,
      errores: errores,
    });
    this.toastsSubject.next([...currentToasts]);
  }

  remove(toast: any | null) {
    const currentToasts = this.toastsSubject.getValue();
    const updatedToasts = currentToasts.filter((t) => t !== toast);
    this.toastsSubject.next(updatedToasts);
  }
}
