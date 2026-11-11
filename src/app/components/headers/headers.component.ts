import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonConstants, ModalConstants, ModalOpciones } from '../../constant';
import { environment } from '../../../environments/environment';
import { CryptoService } from '../../core/crypto.service';
import { StorageService } from '../../core/storage.service';
import { AlertService } from '../shared/alert/alert.service';
import { Modal } from '../shared/modal/modal';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from "../shared/modal/modal.component";
import { UsuarioResponse } from '../../api/mesa-departes-presencial/models';
import { Area } from '../../models/app.model';

@Component({
  selector: 'app-headers',
  standalone: true,
  imports: [NgbModule, NgbDropdownModule, CommonModule, ModalComponent],
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent {

  modal!: Modal;

  // usuario: UsuarioResponse = {} as UsuarioResponse;
  usuario: UsuarioResponse = {} as UsuarioResponse;
  modulo: any;
  constructor(
    private readonly storageService: StorageService,
    private readonly cryptoService: CryptoService,
    private readonly alerteService: AlertService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.initializeUser();
  }

  private initializeUser(): void {
    try {
      const authDataStr = this.storageService.getFromCache(CommonConstants.STORAGE.AUTH) as Area;
      if (authDataStr) {
        const authData = typeof authDataStr === 'string' ? JSON.parse(authDataStr) : authDataStr;
        if (authData) {
          this.usuario = authData;
          this.modulo = this.storageService.getFromCache(CommonConstants.STORAGE.MODULOSUSER);
        } else {
          this.alerteService.error('Error al cargar los datos del usuario');
        }
      }
    } catch (error) {
      this.alerteService.error('Error al procesar los datos del usuario');
    }
  }

  /**
 * Cierra la sesion del usuario
 * @returns void
 * @memberof HeaderPageComponent
 */
  cerrarSesion() {
    this.modal = {
      ...ModalConstants.CerrarSesion,
      open: true,
      type: ModalOpciones.CONFIRMARSESION,
      bad: 'Cancelar',
    };
  }

  aceptarModal = () => {
    if (this.modal?.type === ModalOpciones.CONFIRMARSESION) {
      this.storageService.destroyAll();
      this.storageService.destroy(CommonConstants.STORAGE.AUTH);
      this.storageService.destroy(CommonConstants.STORAGE.TOKEN);
      this.alerteService.warning('Sesión cerrada correctamente');
      window.location.href = environment.rutas.landing;

    }
  }

  cerrarModal = () => {
    if (this.modal) {
      this.modal.open = false;
      this.cdr.detectChanges();
    }
  };

}
