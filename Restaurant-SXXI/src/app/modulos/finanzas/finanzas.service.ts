import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  public obtenerBoletasPorPagarEnCaja(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/boleta/obtenerBoletasPorPagarEnCaja'
    );
  }

  public obtenerBoletasPago1Reabastecimiento(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/boleta/obtenerBoletasPago1Reabastecimiento'
    );
  }

  public obtenerBoletasPago2Reabastecimiento(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/boleta/obtenerBoletasPago2Reabastecimiento'
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
  
  public crearTransaccion(trans){
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/transaccion/crearTransaccion', trans, {headers : this.headers}
    );
  }

  public obtenerSolicitudReabastecimientoFinanzas(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/obtenerSolicitudReabastecimientoFinanzas', {headers : this.headers}
    );
  }

  public crearRegistro(registro) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/crearRegistro', registro , {responseType : 'text'} //asi se tiene que llamar en el controller
    );
  } 

  public actualizarUltimaVersionRegistro(id_registro) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/actualizarUltimaVersionRegistro', id_registro , {responseType : 'text'} //asi se tiene que llamar en el controller
    );
  } 

  obtenerProductos(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/obtenerProductos'
    );
  }

  public subirPdfReporte(file) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/reportes/save', file
    );
  }

  public crearReporte(reporte) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reporte/crearReporte', reporte, {responseType: 'text'}
    );
  }
}
