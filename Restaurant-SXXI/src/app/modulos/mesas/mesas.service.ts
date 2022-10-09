import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { IngresarReserva, Mesa } from 'src/app/interfaces/mesa';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  headers: HttpHeaders;
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   }

  get refresh$(){
    return this._refresh$;
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
    ).pipe(
      tap(() => {
        this._refresh$.next;
      })
    );
  }

  public ingresarReserva(ingresarReserva : IngresarReserva) {
    return this.http.post(
      'http://localhost:8085/restaurantSXXI/rest-rsxii/reserva/ingresarReserva', ingresarReserva, { responseType : 'text'}
    ).pipe(
      tap(() => {
        this._refresh$.next;
      })
    );
  }

  
}
