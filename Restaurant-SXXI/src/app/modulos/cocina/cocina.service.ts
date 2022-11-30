import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plato } from 'src/app/interfaces/cocina';

@Injectable({
  providedIn: 'root'
})
export class CocinaService {
  
  headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerPlatos() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/plato/obtenerPlatos'
    );
  }
  
  public obtenerProductos(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/obtenerProductos'
    );
  }

  public crearReceta(unaReceta) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/receta/crearReceta', unaReceta, { responseType : 'text' }
    );
  }

  public obtenerRecetas() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/receta/obtenerRecetas'
    );
  }

  public modificarReceta(unaReceta){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/receta/modificarReceta', unaReceta,{responseType : 'text'}
    );
  }

  public eliminarReceta(receta){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/receta/eliminarReceta', receta, {responseType : 'text'}
    
    );
  }
  
  public crearPlato(platoACrear : Plato) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/plato/crearPlato', platoACrear, { responseType : 'text'}
    );
  }

  public obtenerTipoPlato() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/plato/obtenerTipoPlato', { headers: this.headers }
    );
  }

  public obtenerTipoProducto() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/obtenerTipoProducto', { headers: this.headers }
    );
  }

  public eliminarPlato(platoAEliminar) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/plato/eliminarPlato', platoAEliminar, { responseType : 'text' }
    );
  }

  public modificarPlato(platoAModificar : Plato) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/plato/modificarPlato', platoAModificar, { responseType : 'text'}
    );
  }

  public obtenerPedidosEnCola() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/pedido/obtenerPedidosEnCola', { headers: this.headers }
    );
  }

  public modificarInstanciaPedido(modificarInstanciaPedido) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/pedido/modificarInstanciaPedido', modificarInstanciaPedido, { responseType : 'text'}
    );
  }

  public obtenerPedidosEnPreparacion() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/pedido/obtenerPedidosEnPreparacion', { headers: this.headers }
    );
  }

  public obtenerPedidosParaEntregar() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/pedido/obtenerPedidosParaEntregar', { headers: this.headers }
    );
  }
  public obtenerPedidosEntregadosHoy() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/pedido/obtenerPedidosEntregadosHoy', { headers: this.headers }
    );
  }

  public subirImagenPlato(file) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/plato/save',  file
    );
  }

  public subirImagenProducto(file) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/producto/save', file
    );
  }

  public obtenerImagenPlato(file) {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/imagenes-rxxi/platos/'+file
    );
  }

  public obtenerImagenProducto(file) {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/imagenes-rxxi/productos/'+file
    );
  }

  public crearProducto(unProducto) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/crearProducto', unProducto, { responseType : 'text' }
    );
  }

  public modificarProducto(productoAModificar) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/modificarProducto', productoAModificar, { responseType : 'text'}
    );
  }

  public eliminarProducto(productoAEliminar) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/eliminarProducto', productoAEliminar, { responseType : 'text' }
    );
  }

  public crearReporte(reporte) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reporte/crearReporte', reporte, {responseType: 'text'}
    );
  } 

  public crearRegistro(registro) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/crearRegistro', registro , {responseType : 'text'} //asi se tiene que llamar en el controller
    );
  } 
}