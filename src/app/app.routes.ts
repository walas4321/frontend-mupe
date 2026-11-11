import { Routes } from '@angular/router';
import { AuthenticationGuard } from './core/authentication/guard/auth.guard';
//import { AuthPermissionGuard } from './core/guards/_auth-permission.guard';

import { AccesoDenegadoComponent } from './components/shared/acceso-denegado/acceso-denegado.component';
import { BienvenidaComponent } from './components/denuncias-mupe/bienvenida/bienvenida.component';
import { ValidaServiceIdperuComponent } from './components/denuncias-mupe/valida-service-idperu/valida-service-idperu.component';
import { RegistroDenuncia2Component } from './components/denuncias-mupe/registro-denuncia_STEP/registro-denuncia.component';
import { RegistroDenunciaComponent } from './components/denuncias-mupe/registro-denuncia/registro-denuncia.component';


export const routes: Routes = [

  // Público
  { path: '', redirectTo: 'bienvenida', pathMatch: 'full' }, 
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'acceso-denegado', component: AccesoDenegadoComponent },
  { path: 'callback', component: ValidaServiceIdperuComponent },  
  { path: 'registro-mupe', component: RegistroDenunciaComponent },
  { path: 'registro-mupe2', component: RegistroDenuncia2Component },
  { path: '**', redirectTo: 'bienvenida' }

];


