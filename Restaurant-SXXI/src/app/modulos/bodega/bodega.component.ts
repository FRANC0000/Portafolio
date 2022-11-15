import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/cocina';
import { BodegaService } from './bodega.service';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.scss']
})
export class BodegaComponent implements OnInit {

  constructor(private router: Router,
    private bodegaService : BodegaService) {}

  usuarioLogeado :string = localStorage.getItem('id_usuario');
  rolUsuarioLogeado : string = localStorage.getItem('rol');

  listaProductos : Producto[] = [];
  productoSelected ;

  ngOnInit() {
    console.log('usuarioLogeado', this.usuarioLogeado);
    console.log('rolUsuarioLogeado', this.rolUsuarioLogeado);
    this.obtenerProductos();
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
    localStorage.clear();
  }

  obtenerProductos(){
    this.bodegaService.obtenerProductos().subscribe(resp=>{
      this.listaProductos = resp['productos'].sort((a,b) =>{
        if(a.id_producto < b.id_producto){
          return -1
        }
        if (a.id_producto > b.id_producto){
          return 1
        }
        return 0;
      });
      console.log('listaProductos', this.listaProductos);
    })
  }

  seleccionarProducto(producto){
    this.productoSelected = producto
    console.log('pr', this.productoSelected);
    
  }
}
