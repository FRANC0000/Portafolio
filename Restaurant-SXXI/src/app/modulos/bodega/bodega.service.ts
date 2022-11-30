import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {
  headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  obtenerProductos(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/producto/obtenerProductos'
    );
  }

  obtenerSolicitudReabastecimiento(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/obtenerSolicitudReabastecimiento'
    );
  }

  obtenerSolicitudReabastecimientoAprobada(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/obtenerSolicitudReabastecimientoAprobada'
    );
  }

  obtenerSolicitudReabastecimientoRechazada(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/obtenerSolicitudReabastecimientoRechazada'
    );
  }

  obtenerSolicitudReabastecimientoModificada(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/obtenerSolicitudReabastecimientoModificada'
    );
  }

  obtenerSolicitudReabastecimientoProveedores(){
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/registro/obtenerSolicitudReabastecimientoProveedores'
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
}
