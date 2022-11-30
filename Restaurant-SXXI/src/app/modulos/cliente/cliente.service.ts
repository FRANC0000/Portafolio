import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstanciarBoleta, InstanciarPedido } from 'src/app/interfaces/carrito-compras';
import { CancelarReserva, EncuestaCancelacion, EncuestaSatisfaccion, ModificarReserva } from 'src/app/interfaces/mesa';

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

  public terminarEstancia(terminarEstancia : CancelarReserva) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reserva/terminarEstancia', terminarEstancia, { responseType : 'text'}
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

  public crearCarteraPagos(cart){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/cartera/crearCarteraPagos', cart, {headers : this.headers}
    );
  }

  public crearTransaccion(trans){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/transaccion/crearTransaccion', trans, {headers : this.headers}
    );
  }

public crearEncuestaCancelacion(encuestaCancelacionACrear : EncuestaCancelacion) {
  return this.http.post(
    'http://localhost:8085/restaurantSXXI/rest-rsxii/encuesta-cancelacion/crearEncuestaCancelacion', encuestaCancelacionACrear, { responseType : 'text'}
  );
}

public crearEncuestaSatisfaccion(encuestaSatisfaccionACrear : EncuestaSatisfaccion) {
  return this.http.post(
    'http://localhost:8085/restaurantSXXI/rest-rsxii/encuesta-satisfaccion/crearEncuestaSatisfaccion', encuestaSatisfaccionACrear, { responseType : 'text'}
  );
}

public modificarReserva(reservaAModificar : ModificarReserva){
  return this.http.post(
    'http://localhost:8085/restaurantSXXI/rest-rsxii/reserva/modificarInteraccion', reservaAModificar, { responseType : 'text'}
  );
}
}
