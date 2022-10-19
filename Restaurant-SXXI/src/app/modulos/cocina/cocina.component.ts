import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plato, Producto } from 'src/app/interfaces/cocina';
import { CocinaService } from './cocina.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {

  constructor(private router: Router, private cocinaService : CocinaService) { }

  listaPlatos : Plato[] = [];
  listaProductos : Producto[] = [];
  visibleDetallePlato = false;
  visibleDetalleProdcuto = false;
  platoSelected : Plato;
  productoSelected : Producto;

  ngOnInit() {
    this.obtenerPlatos();
    this.obtenerProductos();
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
  }
  
  obtenerPlatos(){
    this.cocinaService.obtenerPlatos().subscribe(resp=>{
      this.listaPlatos = resp['plato'];
      console.log('listaPlatos', this.listaPlatos);
      
    });
  }

  obtenerProductos(){
    this.cocinaService.obtenerProductos().subscribe(resp=>{
      this.listaProductos = resp['productos'];
      console.log('listaProductos', this.listaProductos);
    })
  }

  verDetallePlato(plato){
    this.visibleDetallePlato = true;
    this.platoSelected = plato;
    console.log('platoSelected', this.platoSelected);
  }

  verDetalleProducto(producto){
    this.visibleDetalleProdcuto = true;
    this.productoSelected = producto;
    console.log('productoSelected', this.productoSelected);
  }

  cerrarDrawerDetalleProducto(){
    this.visibleDetalleProdcuto = false;
  }

  cerrarDrawerDetallePlato(){
    this.visibleDetallePlato = false;
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
