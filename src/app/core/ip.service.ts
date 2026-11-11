import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IpService {

	private apiUrl = environment.urlApiIp;

	constructor( private http: HttpClient ) { }

  getIp(): Observable<string | null> {
    return this.http.get<{ ip: string }>(this.apiUrl).pipe(
      map(response => response ? response.ip : null), // Extrae la IP de la respuesta
      catchError((error: any): Observable<null> => {
        console.error('Error en la solicitud HTTP:', error);
        return of(null); // Retorna null en caso de error
      })
    );
  }

}
