import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-valida-service-idperu',
  standalone: true,
  imports: [],
  templateUrl: './valida-service-idperu.component.html',
  styleUrl: './valida-service-idperu.component.scss'
})
export class ValidaServiceIdperuComponent implements OnInit{

  constructor(private route: ActivatedRoute,  private router: Router) {}

  ngOnInit(): void {

    //console.log('CallbackComponent cargado');

    this.route.queryParams.subscribe(params => {
      const status = params['status'];
      const token = params['access_token'];

      // console.log('status:', status);
      // console.log('access_token:', token);

      if (status === 'success') {
        // aquí puedes guardar el token
        localStorage.setItem('access_token', token);

        //recupero dni
        const dni = localStorage.getItem('dni_actual');
        //console.log(dni)

        // 🔥 redirigir a tu formulario
        this.router.navigate(['/registro/persona-natural'], {
           state: { dni: dni }
        });

        // o llamar a tu backend
      } else {
        localStorage.removeItem('dni_actual');
        localStorage.removeItem('access_token');
        this.router.navigate(['/registro/persona-natural']);
        console.error('Autenticación fallida');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Autenticación fallida',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

}
