import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var google: any;

@Component({
  selector: 'app-registro-denuncia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registro-denuncia.component.html',
  styleUrl: './registro-denuncia.component.scss'
})
export class RegistroDenuncia2Component{

  paso = 1;
  form!: FormGroup;

  map: any;
  marker: any;

  archivos: File[] = [];
  maxArchivos = 5;

  zoomActual: number = 6;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // Paso 1 
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      telefono: ['', [Validators.pattern(/^[0-9]{9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]], 

      // Paso 2
      direccion: ['', Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required],

      // Paso 3
      archivos: [null, Validators.required]
      
    });
  }

  // ngAfterViewInit() {
  //   this.initMap();
  // }

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
    const campos = ['nombres', 'dni', 'email'];
    campos.forEach(c => this.form.get(c)?.markAsTouched());
    return campos.every(c => this.form.get(c)?.valid);
  }

  validarPaso2(): boolean {
    const campos = ['direccion', 'lat', 'lng'];
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

      // const defaultLatLng = { lat: -12.0464, lng: -77.0428 }; // Lima

      // this.map = new google.maps.Map(document.getElementById('map'), {
      //   center: defaultLatLng,
      //   zoom: 6
      // });

      // this.map.setOptions({
      //   draggableCursor: 'crosshair'
      // });

      // this.map.addListener('click', (event: any) => {
      //   const lat = event.latLng.lat();
      //   const lng = event.latLng.lng();

      //   this.setMarker(lat, lng);

      //   this.form.patchValue({
      //     lat,
      //     lng
      //   });
      // });
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

    for (let file of files) {
      if (!permitidos.includes(file.type)) {
        alert('Solo PDF o imágenes');
        return;
      }
    }

    this.archivos = [...this.archivos, ...files];
    this.form.patchValue({ archivos: this.archivos });
  }

  eliminarArchivo(index: number) {
    this.archivos.splice(index, 1);
    this.form.patchValue({ archivos: this.archivos });
  }

  // ---------------------------
  // FINAL
  // ---------------------------
  registrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = new FormData();

    Object.entries(this.form.value).forEach(([key, value]) => {
      if (key !== 'archivos') {
        formData.append(key, value as any);
      }
    });

    this.archivos.forEach(file => {
      formData.append('files', file);
    });

    console.log('FORM DATA LISTO PARA API', formData);

    // 👉 Aquí envías a Spring Boot
  }

  


}
