import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

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
}
