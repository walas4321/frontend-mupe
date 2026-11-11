import CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CryptoService {

    private readonly key: string = environment.cryptKey;

    constructor() { }

    encrypt = ( datos: string ) => {
        let valorEncriptado = CryptoJS.AES.encrypt(datos, this.key).toString();
        return valorEncriptado;
    }

    decrypt = ( datos: string ) => {
        try {
            let bytes = CryptoJS.AES.decrypt(datos, this.key);
            let valorDesencriptado = bytes.toString(CryptoJS.enc.Utf8);
            if ( valorDesencriptado !== '' ) {
                return String(valorDesencriptado + '').replace(/"null"/g, 'null');
            }
        } catch ( error ) {
           console.error(`Ha ocurrido un error al intentar descriptar: ${datos}`);
        }
        return '';
    }

}
