import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../../storage.service';
import { CommonConstants } from '../../../constant';
//import { UsuarioResponse } from '../../../api/mesa-departes-presencial/models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router // Inyecta el servicio Router
  ) {}

  canActivate() {

    return false;
    // const auth = this.storageService.getFromCache(CommonConstants.STORAGE.AUTH) as UsuarioResponse;
    // if (auth && auth.authData?.access_token) return true;
    
    // this.router.navigate(['/login']);
    // return false;
  }
}