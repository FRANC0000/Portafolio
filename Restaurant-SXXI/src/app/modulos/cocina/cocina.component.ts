import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plato } from 'src/app/interfaces/cocina';
import { CocinaService } from './cocina.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {

  constructor(private router: Router, private cocinaService : CocinaService) { }

  listaPlatos : Plato[] = [];

  ngOnInit() {
    this.obtenerPlatos();
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
  }

  obtenerPlatos(){
    this.listaPlatos = [];
    this.cocinaService.obtenerPlatos().subscribe(resp => {
      // console.log('resp', resp);
      for (let unPlato of resp["plato"]){
        // console.log('unPlato', unPlato);
        const plato : Plato = {
          id_plato : unPlato.id_plato,
          id_tipo_plato : unPlato.id_tipo_plato,
          nombre_plato : unPlato.nombre_plato,
          precio_plato : unPlato.precio_plato,
          cantidad_personas_recomendadas : unPlato.cantidad_personas_recomendadas,
          descripcion_plato : unPlato.descripcion_plato,
          comentario : unPlato.comentario,
          disponibilidad : unPlato.disponibilidad
        }
        // console.log('plato', plato);
        this.listaPlatos.push(plato);
        console.log('listaPlatos', this.listaPlatos);
        this.listaPlatos.sort(function(a,b){
          if(a.id_plato < b.id_plato){
            return -1
          }
          if (a.id_plato > b.id_plato){
            return 1
          }
          return 0;
        })
      }

    })
  }

  crearPlato(){
    console.log('crearPlato');
    
  }
  crearReceta(){
    console.log('crearReceta');
    
  }
  verPlatos(){
    console.log('verPlatos');
    
  }

}
