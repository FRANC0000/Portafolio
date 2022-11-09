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
