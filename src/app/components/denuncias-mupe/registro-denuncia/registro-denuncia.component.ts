import { ChangeDetectorRef, Component, inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DenunciaResponse, UbigeoResponse } from '../../../api/denuncias-mupe/models';
import { ServiciosDeDenunciasService, ServiciosDeUbigeoService } from '../../../api/denuncias-mupe/services';
import { ErrorModel } from '../../../models';
import { AlertService } from '../../shared/alert/alert.service';
import { Modal } from '../../shared/modal/modal';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalOpciones, ModalConstants } from '../../../constant';
import Swal from 'sweetalert2';
import { ShowErrorComponent } from '../../shared/show-error/show-error.component';
import { HttpErrorResponse } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'app-registro-denuncia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    NgSelectModule,
    ModalComponent,
    ShowErrorComponent

  ],
  templateUrl: './registro-denuncia.component.html',
  styleUrl: './registro-denuncia.component.scss'
})
export class RegistroDenunciaComponent {

  paso = 1;
  form!: FormGroup;

  map: any;
  marker: any;

  archivos: Array<{ file: File, valid: boolean, error?: string }> = [];
  maxArchivos = 5;

  zoomActual: number = 6;

  enviado = false;

  modal!: Modal;

  public isLoading: boolean = false;
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  denunciaRequest: any;

  /* servicios */
  private readonly alertService = inject(AlertService);
  private readonly serviciosDeUbigeoService = inject(ServiciosDeUbigeoService);
  private readonly serviciosDeDenunciasService = inject(ServiciosDeDenunciasService);

  /* tipos de datos */
  public departamentoResponseDto: Array<UbigeoResponse> = [];  
  public provinciaResponseDto: Array<UbigeoResponse> = [];  
  public distritoResponseDto: Array<UbigeoResponse> = [];  

  constructor(
    private fb: FormBuilder,
    public injector: Injector
  ) {
    this.alertService = this.injector.get<AlertService>(AlertService);

    this.form = this.fb.group({
      // Paso 1 
      anonimo: [false],
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccionDenunciante: ['', Validators.required],
      
      // Paso 2
      departamento: [null, Validators.required],
      provincia: [null, Validators.required],
      distrito: [null, Validators.required], 
      direccion: ['', Validators.required],
      referencia: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      

      // Paso 3
      archivos: [null, Validators.required]
    });
  }

  ngOnInit(): void{

    this.inicializar();

    /* Suscripcion a departamento */
    this.form.get('departamento')!
      .valueChanges
      .subscribe((departamento: string) => {
        console.log(departamento)
        this.form.get('provincia')!.reset();
        this.form.get('distrito')!.reset();
        this.provinciaResponseDto = [];
        this.distritoResponseDto = [];

        if (!departamento) {
          return;
        }

        const codDepa = Number(departamento);
        this.cargarProvincias(codDepa);
      });

    /* Suscripcion a provincia */
    this.form.get('provincia')!
      .valueChanges
      .subscribe((codProvincia: string) => {

        this.form.get('distrito')!.reset();
        this.distritoResponseDto = [];

        if (!codProvincia) {
          return;
        }

        const codDepa = Number(this.form.get('departamento')!.value);
        const codProv = Number(codProvincia);

        this.cargarDistritos(codDepa, codProv);
      });

      /* Suscripcion a anonimo */
      this.form.get('anonimo')?.valueChanges.subscribe((valor) => {
      if (valor) {
        this.limpiarYDeshabilitarDatos();
      } else {
        this.habilitarDatos();
      }
    });

  }

  get f() {
    return this.form.controls;
  }

  inicializar(){
    //this.crearFormulario();
    this.cargarDepartamento();
  }

  cargarDepartamento(){
    this.isLoading = true;
    this.serviciosDeUbigeoService.departamentos().subscribe({
      next: (data) => {
        this.departamentoResponseDto = data;
        console.log(this.departamentoResponseDto)
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: ErrorModel) => {
        this.isLoading = false; 
        this.procesarError(error);
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  cargarProvincias(codDepa: number): void{
    console.log(codDepa)
    this.isLoading = true;
    this.serviciosDeUbigeoService.provincias({codDepa}).subscribe({
      next: (data) => {
        this.provinciaResponseDto = data;
        console.log(this.provinciaResponseDto)
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error: ErrorModel) => {
        this.isLoading = false; 
        this.procesarError(error);
        this.changeDetectorRef.detectChanges();
      }
    });

  }

  cargarDistritos(codDepa: number, codProv: number) {
    console.log(codDepa)
    console.log(codProv)

    this.serviciosDeUbigeoService.distritos({
      codDepa,
      codProv
    }).subscribe({
      next: data => {
        this.distritoResponseDto = data;
        this.form.get('distrito')!.enable();
      },
      error: err => this.procesarError(err)
    });
  }


  registrar() {
   
    this.enviado = true;

    // Bloquear envío si hay archivos inválidos
    if (this.hasInvalidFiles) {
      // Mostrar alerta y evitar continuar
      this.alertService.warning('Corrija los errores indicados y luego intente nuevamente registrar la denuncia');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      Swal.fire({
        icon: 'info',
        title: 'Datos incompletos',
        text: 'Debe ingresar los datos obligatorios', 
        confirmButtonColor: '#198754'
      });
      return;
    }

    this.modal = {
      ...ModalConstants.ConfirmarNuevo, 
      open: true,
      type: ModalOpciones.CONFIRMAR, 
      bad: 'Cancelar',
    }


  }

  aceptarModal = () => {

    if (this.modal?.type === ModalOpciones.CONFIRMAR) {
      this.isLoading = true;
      this.registrarCuentaCE();
    }
  }

  cerrarModal = () => {

    if (this.modal) {
      this.modal.open = false;
      this.changeDetectorRef.detectChanges();
    }
  };

  registrarCuentaCE(){

    const f = this.form.value;

    const now = new Date();

    const payload = {
      nombres: f.nombres,
      apellidop: f.apellidoPaterno,   
      apellidom: f.apellidoMaterno,   

      dni: f.dni,
      telefono: f.telefono,
      email: f.email,

      departamento: f.departamento,
      provincia: f.provincia,
      distrito: f.distrito,

      direccion: f.direccion,
      referencia: f.referencia,

      irregularidades: f.descripcion,

      coordsx: String(f.lat),
      coordsy: String(f.lng),

      denuncia_latitud: String(f.lat),
      denuncia_longitud: String(f.lng),

      d_direccion: f.direccion,
      reserva:  f.anonimo ? 'X' : '',

      canal: 'WEB',
      estado: 1,

      //fecha: new Date().toISOString(),
      //fecha_registro: new Date().toISOString(),

      fecha: this.formatFecha(now),
      fecha_registro: this.formatFecha(now),

      codigo_expediente: '00001-2026',
      documentacion: 'xxx',
      cus: '4200',

      m_negativa: '1',
      m_ocupindeb: '2',
      m_constindeb: '3',
      m_otros: '4'
    };

    console.log(payload)

    this.isLoading = true; 
    this.serviciosDeDenunciasService.registrarDenuncia({
      body: {
        data: JSON.stringify(payload),
        files: this.archivos.map(a => a.file)
      }
    }).subscribe({
      next: data => {
        console.log('OK', data)
        this.isLoading = false;
        this.cerrarModal();
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Denuncia MUPE ha sido registrado correctamente con el N° ' + data.id,
            confirmButtonColor: '#198754' 
          });
      },
      //error: err => this.procesarError(err)
      error: (error: HttpErrorResponse) => {
        this.isLoading = false; 
        this.cerrarModal();
        this.procesarError2(error);
        this.changeDetectorRef.detectChanges();
      }
    });

  }


  limpiar() {
    this.form.reset();
    this.enviado = false;
  }

  // ---------------------------
  // ARCHIVOS
  // ---------------------------
  onFileChange(event: any) {
    const files = Array.from(event.target.files) as File[];

    if (files.length + this.archivos.length > this.maxArchivos) {
      alert('Máximo 5 archivos');
      return;
    }

    const permitidos = ['application/pdf', 'image/png', 'image/jpeg'];
    const maxBytes = 1 * 1024 * 1024; // 1 MB

    for (const f of files) {
      let valid = true;
      let error: string | undefined;

      if (!permitidos.includes(f.type)) {
        valid = false;
        error = 'Formato no permitido. Solo PDF, PNG o JPG.';
      } else if (f.size && f.size > maxBytes) {
        valid = false;
        error = 'Archivo demasiado grande. Tamaño máximo 1 MB.';
      }

      this.archivos.push({ file: f, valid, error });
    }

    this.form.patchValue({ archivos: this.archivos.map(a => a.file) });
    // Forzar refresh para evitar problemas de render
    this.changeDetectorRef.detectChanges();
  }

  eliminarArchivo(index: number) {
    this.archivos.splice(index, 1);
    this.form.patchValue({ archivos: this.archivos.map(a => a.file) });
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Indica si existen archivos inválidos
  get hasInvalidFiles(): boolean {
    return this.archivos && this.archivos.some(a => a && a.valid === false);
  }

  // ---------------------------
  // STEP NAVIGATION
  // ---------------------------
  siguiente() {
    if (this.paso === 1 && this.validarPaso1()){
      this.paso++;
      setTimeout(() => this.initMap(), 100);
    } else if (this.paso === 2 && this.validarPaso2()) {
      this.paso++;
    }
  }

  anterior() {
    this.paso--;

    if (this.paso === 2) {
      setTimeout(() => {
        this.initMap();
        //this.initAutocomplete();
      }, 100); // 👈 CLAVE
    }
  }

  validarPaso1(): boolean {

    const esAnonimo = this.form.get('anonimo')?.value;

    if (esAnonimo) {
      return true;
    }

    const campos = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'dni', 'telefono', 'email', 'direccionDenunciante'];
    campos.forEach(c => this.form.get(c)?.markAsTouched());
    return campos.every(c => this.form.get(c)?.valid);
  }

  validarPaso2(): boolean {
    // const campos = ['direccion', 'lat', 'lng'];
    const campos = ['departamento', 'provincia', 'distrito', 'direccion', 'referencia', 'descripcion', 'lat', 'lng'];
    campos.forEach(c => this.form.get(c)?.markAsTouched());
    return campos.every(c => this.form.get(c)?.valid);
  }

  // ---------------------------
  // GOOGLE MAPS
  // ---------------------------
  initMap() {
    const mapDiv = document.getElementById('map');

    if (!mapDiv) return; // 👈 evita errores si el DOM aún no está

    // 👉 Si ya hay coords guardadas, las usamos
    const lat = this.form.value.lat || -12.0464;
    const lng = this.form.value.lng || -77.0428;

    // 👉 Si es la primera vez (sin coords), zoom inicial
    if (!this.form.value.lat) {
      this.zoomActual = 6;
    }

    const center = { lat, lng };

    // 👉 CREACIÓN DEL MAPA
    this.map = new google.maps.Map(mapDiv, {
      center,
      //zoom: this.form.value.lat ? 16 : 6
      zoom: this.zoomActual
    });

    this.map.setOptions({
      draggableCursor: 'crosshair'
    });

    // 👉 Guardar zoom dinámicamente
    this.map.addListener('zoom_changed', () => {
      this.zoomActual = this.map.getZoom();
    });

    // 👉 Si ya había marker, lo volvemos a pintar
    if (this.form.value.lat && this.form.value.lng) {
      if (this.marker) {
        this.marker.setMap(null);
        // 👉 Reusar marker existente
        this.marker.setMap(this.map);
        this.marker.setPosition({ lat, lng });

      } else {
        // 👉 Crear uno nuevo si no existe
        this.setMarker(lat, lng);
      }
    }

    // 👉 Evento click en mapa
    this.map.addListener('click', (event: any) => {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();

      this.setMarker(newLat, newLng);

      this.form.patchValue({
        lat: newLat,
        lng: newLng
      });

      //this.obtenerDireccion(newLat, newLng); // 👈 importante
    });

  }

  setMarker(lat: number, lng: number) {
    //if (this.marker) this.marker.setMap(null);
    if (this.marker) {
      this.marker.setPosition({ lat, lng });
      return;
    }

    this.marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      draggable: true, // 👈 CLAVE
      animation: google.maps.Animation.DROP // opcional pero pro
    });

    // 👉 Cuando el usuario mueve el marker
    this.marker.addListener('dragend', (event: any) => {
      const newLat = event.latLng.lat();
      const newLng = event.latLng.lng();

      this.form.patchValue({
        lat: newLat,
        lng: newLng
      });
    });
  }

  private formatFecha(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
        + `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.000`;
  }

  limpiarYDeshabilitarDatos() {
    const campos = [
      'nombres',
      'apellidoPaterno',
      'apellidoMaterno',
      'dni',
      'telefono',
      'email',
      'direccionDenunciante'
    ];

    campos.forEach(campo => {
      this.form.get(campo)?.reset();
      this.form.get(campo)?.disable();
    });
  }

  habilitarDatos() {
    const campos = [
      'nombres',
      'apellidoPaterno',
      'apellidoMaterno',
      'dni',
      'telefono',
      'email',
      'direccionDenunciante'
    ];

    campos.forEach(campo => {
      this.form.get(campo)?.enable();
    });
  }

   /*
    * Inicialización de componentes
    * @return void
    * Autor: SBN
  */
  procesarError(error: ErrorModel) {
    console.log(error);
    if (error && error?.baseError.exceptionDetail) {
      console.log(error?.baseError.exceptionDetail)
      this.alertService.error(error?.baseError.exceptionDetail);
      return; 
    }
    this.alertService.error("Ocurrió un error inesperado, por favor intente nuevamente.");
  }


   procesarError2(error: HttpErrorResponse) {
    // Log full error for debugging
    console.error('HTTP Error Response:', error);

    // Try several possible locations for a useful error message
    const detail =
      error?.error?.baseError?.exceptionDetail ||
      error?.error?.message ||
      error?.error?.baseError ||
      (typeof error?.error === 'string' ? error.error : undefined) ||
      error?.message;

    if (detail) {
      const message = typeof detail === 'string' ? detail : (detail.message || JSON.stringify(detail));
      console.log('Error detail:', message);
      this.alertService.error(message);
      this.changeDetectorRef.detectChanges();
      return;
    }

    this.alertService.error("Ocurrió un error inesperado, por favor intente nuevamente.");
    this.changeDetectorRef.detectChanges();
  }



}
