import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdministadorService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerUsuarios() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/usuario/obtenerUsuarios',
      { headers: this.headers }
    );
  }
  
  public crearUsuario(usuarioACrear :user) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/usuario/crearUsuario', usuarioACrear, { responseType : 'text'}
    );
  }
}
