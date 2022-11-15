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
  
  public modificarProducto(productoAModificar) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/modificarProducto', productoAModificar, { responseType : 'text'}
    );
  }

  public subirImagenProducto(file) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/producto/save', file
    );
  }

  public obtenerProductos(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/obtenerProductos'
    );
  }

  public modificarReceta(unaReceta){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/receta/modificarReceta', unaReceta,{responseType : 'text'}
    );
  }

  public obtenerRecetas() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/receta/obtenerRecetas'
    );
  }
  
  public crearReceta(unaReceta) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/receta/crearReceta', unaReceta, { responseType : 'text' }
    );
  }

  public crearProducto(unProducto) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/crearProducto', unProducto, { responseType : 'text' }
    );
  }

  public obtenerTipoProducto() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/obtenerTipoProducto', { headers: this.headers }
    );
  }

  public eliminarProducto(productoAEliminar) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/eliminarProducto', productoAEliminar, { responseType : 'text' }
    );
  }

  public obtenerClientes() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/cliente/obtenerClientes',
      { headers : this.headers}
    );
  }

  public obtenerReporteStock() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reporte/obtenerReporteStock' //asi se tiene que llamar en el controller
    );
  } 

  public crearReporte(reporte) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reporte/crearReporte', reporte, {responseType: 'text'}
    );
  } 
  
  public obtenerTipoReporte() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reporte/obtenerTipoReporte' //asi se tiene que llamar en el controller
    );
  } 

  public obtenerReportes() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reporte/obtenerReportes' //asi se tiene que llamar en el controller
    );
  } 

  public eliminarReporte(id_reporte) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reporte/eliminarReporte', id_reporte , {responseType : 'text'} //asi se tiene que llamar en el controller
    );
  } 
}
