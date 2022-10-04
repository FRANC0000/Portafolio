import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iniciarSesion, user } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public iniciarSesion(credenciales :iniciarSesion) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/usuario/iniciarSesion', credenciales, { responseType : 'text'}
    );
  }

  public obtenerUnUsuario(usuario :any) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/usuario/obtenerUnUsuario', usuario
    );
  }
}
