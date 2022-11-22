import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  listaRegistrosRecepcionSolicitudReabastecimiento;
  isVisibleDetalleRegistro = false;
  registroRecepcionSolicitudReabastecimiento;
  linkSolicitudReabastecimiento = "";

  ngOnInit() {
    console.log('usuarioLogeado', this.usuarioLogeado);
    console.log('rolUsuarioLogeado', this.rolUsuarioLogeado);
    this.obtenerProductos();
    this.obtenerSolicitudReabastecimiento();
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

  obtenerSolicitudReabastecimiento(){
    this.bodegaService.obtenerSolicitudReabastecimiento().subscribe(resp=>{
      this.listaRegistrosRecepcionSolicitudReabastecimiento = resp['registros']

      console.log('listaRegistrosRecepcionSolicitudReabastecimiento', this.listaRegistrosRecepcionSolicitudReabastecimiento);
    })
  }

  seleccionarProducto(producto){
    this.productoSelected = producto
    console.log('pr', this.productoSelected);
  }

  verDetalleRegistro(reg){
    this.isVisibleDetalleRegistro = true;
    this.registroRecepcionSolicitudReabastecimiento  = reg;
    this.linkSolicitudReabastecimiento = 'http://localhost:8085/restaurantSXXI/imagenes-rxxi/reportes/'+ reg.reporte.nombre_creacion + "#toolbar=0"

    console.log('url', this.linkSolicitudReabastecimiento);
    
  }

  cerrarDrawerDetalleSolicitudReabastecimiento(){
    this.isVisibleDetalleRegistro = false;
    this.registroRecepcionSolicitudReabastecimiento = null;
  }
}
