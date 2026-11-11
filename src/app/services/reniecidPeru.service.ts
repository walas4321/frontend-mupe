import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class reniecidPeru {

    private api = 'https://conecta.sbn.gob.pe/consulta-reniec-sbn/api/v1/reniec/idperu';

    constructor(private http: HttpClient) {}

    getAuthUrl(dni: string, appId: string) {
        return this.http.post<any>(`${this.api}/auth/url-idperu`, { 
            dni,
            appId
        });
    }

}