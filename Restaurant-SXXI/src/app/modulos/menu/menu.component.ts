import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plato } from 'src/app/interfaces/cocina';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  listaPlatos : Plato[] = [];
  constructor(private router: Router, private menuService : MenuService) { }

  ngOnInit() {
    this.obtenerPlatos();
  }

  obtenerPlatos(){
    this.listaPlatos = [];
    this.menuService.obtenerPlatos().subscribe(resp => {
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
          disponibilidad : unPlato.disponibilidad,
          eliminado: unPlato.eliminado
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

}
