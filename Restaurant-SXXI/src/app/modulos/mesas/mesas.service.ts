import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
      'http://localhost:8085/restaurantSXXI/rest-rsxii/mesa/obtenerMesas'
    );
  }
}
