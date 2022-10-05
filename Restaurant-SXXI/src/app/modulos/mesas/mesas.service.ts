import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Options } from 'selenium-webdriver';
import { Mesa } from 'src/app/interfaces/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  headers: HttpHeaders;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
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

  public crearMesa(mesa : Mesa) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/mesa/crearMesa', mesa, { responseType : 'text'}
    );
  }

  
}
