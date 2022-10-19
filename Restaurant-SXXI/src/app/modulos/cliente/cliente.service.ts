import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstanciarBoleta, InstanciarPedido } from 'src/app/interfaces/carrito-compras';
import { CancelarReserva } from 'src/app/interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerUnaMesa(id_mesa) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/mesa/obtenerUnaMesa', id_mesa, { headers: this.headers }
    );
  }

  public cancelarReserva(cancelarReserva : CancelarReserva) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reserva/cancelarReserva', cancelarReserva, { responseType : 'text'}
    );
  }

  public obtenerReservaActivaPorIdMesa(id_mesa) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reserva/obtenerReservaActivaPorIdMesa', id_mesa, {headers : this.headers}
    );
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

  public instanciarBoleta(instanciarBoleta : InstanciarBoleta){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/boleta/instanciarBoleta', instanciarBoleta, {responseType : 'text'}
    );
  }

  public instanciarPedido(instanciarPedido : InstanciarPedido){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/pedido/ingresarPedido', instanciarPedido, {responseType : 'text'}
    );
  }

  public obtenerBoletaEnProcesoPorIdCliente(id_cliente){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/boleta/obtenerBoletaEnProcesoPorIdCliente', id_cliente, {headers : this.headers}
    );
  }

  public obtenerPedidosPorIdBoleta(id_boleta){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/pedido/obtenerPedidosPorIdBoleta', id_boleta, {headers : this.headers}
    );
  }

  public modificarBoleta(boleta){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/boleta/boletaAModificar', boleta, {headers : this.headers}
    );
  }
}
