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

}
