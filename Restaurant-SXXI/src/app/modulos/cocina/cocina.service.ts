import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plato, Receta, PlatoId } from 'src/app/interfaces/cocina';

@Injectable({
  providedIn: 'root'
})
export class CocinaService {
  obtenerReceta() {
    throw new Error('Method not implemented.');
  }
  
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

  public crearPlato(platoACrear : Plato) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/plato/crearPlato', platoACrear, { responseType : 'text'}
    );
  }

  public obtenerRecetas() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/receta/obtenerRecetas',
      { headers: this.headers }
    );
  }

  public obtenerTipoPlato() {
    return this.http.get(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/plato/obtenerTipoPlato', { headers: this.headers }
    );
  }

  public eliminarPlato(platoAEliminar : PlatoId) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/plato/eliminarPlato', platoAEliminar, { responseType : 'text' }
    );
  }

}
