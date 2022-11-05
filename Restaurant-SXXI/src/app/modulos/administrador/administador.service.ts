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

  public obtenerRoles() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/usuario/obtenerRoles', { headers: this.headers }
    );
  }

  public modificarUsuario(usuarioAModificar) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/usuario/modificarUsuario', usuarioAModificar, { responseType : 'text'}
    );
  }

  public eliminarUsuario(usuarioAEliminar) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/usuario/eliminarUsuario', usuarioAEliminar, { responseType : 'text'}
    );
  }
  
  public crearMesa(mesa) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/mesa/crearMesa', mesa, { responseType : 'text'}
    );
  }

  public obtenerMesas() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/mesa/obtenerMesas',
    );
  }

  public obtenerEstadosMesas() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/estado-mesa/obtenerEstadoMesa'
    );
  }

  public obtenerTipoMesas() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/tipo-mesa/obtenerTipoMesa'
    );
  }

  public actualizarMesa(mesa) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/mesa/modificarMesa', mesa, { responseType : 'text'}
    );
  }

  public eliminarMesa(mesa) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/mesa/eliminarMesa', mesa, { responseType : 'text'}
    );
  } 
}
