import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/cocina';
import { BuzonEntrada } from 'src/app/interfaces/registro';
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
  listaRegistrosRecepcionSolicitudReabastecimientoAprobada = [];
  buzonEntrada : BuzonEntrada[] = []
  isVisibleRegistroBuzon = false;
  registroSeleceted;
  listaRegistrosRecepcionSolicitudReabastecimientoModificada = []
  listaRegistrosRecepcionSolicitudReabastecimientoRechazada = [];
  listaobtenerSolicitudReabastecimientoProveedores = [];

  ngOnInit() {
    console.log('usuarioLogeado', this.usuarioLogeado);
    console.log('rolUsuarioLogeado', this.rolUsuarioLogeado);
    this.obtenerProductos();
    this.obtenerSolicitudReabastecimiento();
    this.obtenerSolicitudReabastecimientoAprobada();
    this.obtenerSolicitudReabastecimientoModificada();
    this.obtenerSolicitudReabastecimientoRechazada();
    this.obtenerSolicitudReabastecimientoProveedores();
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
      this.listaRegistrosRecepcionSolicitudReabastecimiento = resp['registros'].filter(r => {
        return r.ultima_version == true;
      })

      console.log('listaRegistrosRecepcionSolicitudReabastecimiento', this.listaRegistrosRecepcionSolicitudReabastecimiento);
    })
  }

  obtenerSolicitudReabastecimientoAprobada(){
    this.bodegaService.obtenerSolicitudReabastecimientoAprobada().subscribe(resp=>{
      this.listaRegistrosRecepcionSolicitudReabastecimientoAprobada = resp['registros']

      console.log('listaRegistrosRecepcionSolicitudReabastecimientoAprobada', this.listaRegistrosRecepcionSolicitudReabastecimientoAprobada);

      for (let reg of this.listaRegistrosRecepcionSolicitudReabastecimientoAprobada){
        let bzE : BuzonEntrada = {
          registro : Object(reg),
          esAprobado : true,
          esRechazado : false
        }
        this.buzonEntrada.push(bzE);
      }
      this.quitarUltimaVersionFalseBuzon();
      console.log('buzon',this.buzonEntrada);
    })    
  }

  obtenerSolicitudReabastecimientoModificada(){
    this.bodegaService.obtenerSolicitudReabastecimientoModificada().subscribe(resp=>{
      this.listaRegistrosRecepcionSolicitudReabastecimientoModificada = resp['registros']

      console.log('listaRegistrosRecepcionSolicitudReabastecimientoModificada', this.listaRegistrosRecepcionSolicitudReabastecimientoModificada);

      for (let reg of this.listaRegistrosRecepcionSolicitudReabastecimientoModificada){
        let bzE : BuzonEntrada = {
          registro : Object(reg),
          esAprobado : true,
          esRechazado : false,
          esEnviada : false
        }
        this.buzonEntrada.push(bzE);
      }
      this.quitarUltimaVersionFalseBuzon();
      console.log('buzon',this.buzonEntrada);
    })    
  }

  obtenerSolicitudReabastecimientoRechazada(){
    this.bodegaService.obtenerSolicitudReabastecimientoRechazada().subscribe(resp=>{
      this.listaRegistrosRecepcionSolicitudReabastecimientoRechazada = resp['registros']

      console.log('listaRegistrosRecepcionSolicitudReabastecimientoRechazada', this.listaRegistrosRecepcionSolicitudReabastecimientoRechazada);

      for (let reg of this.listaRegistrosRecepcionSolicitudReabastecimientoRechazada){
        let bzE : BuzonEntrada = {
          registro : Object(reg),
          esAprobado : false,
          esRechazado : true,
          esEnviada : false
        }
        this.buzonEntrada.push(bzE);
      }
      this.quitarUltimaVersionFalseBuzon();
      console.log('buzon',this.buzonEntrada);
    })    
  }

  obtenerSolicitudReabastecimientoProveedores(){
    this.bodegaService.obtenerSolicitudReabastecimientoProveedores().subscribe(resp=>{
      this.listaobtenerSolicitudReabastecimientoProveedores = resp['registros']

      console.log('listaobtenerSolicitudReabastecimientoProveedores', this.listaobtenerSolicitudReabastecimientoProveedores);

      for (let reg of this.listaobtenerSolicitudReabastecimientoProveedores){
        let bzE : BuzonEntrada = {
          registro : Object(reg),
          esAprobado : false,
          esRechazado : false,
          esEnviada : true,
        }
        this.buzonEntrada.push(bzE);
      }
      this.quitarUltimaVersionFalseBuzon();
      console.log('buzon',this.buzonEntrada);
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
    console.log('reg', reg);
  }

  cerrarDrawerDetalleSolicitudReabastecimiento(){
    this.isVisibleDetalleRegistro = false;
    this.isVisibleRegistroBuzon = false;
    this.registroRecepcionSolicitudReabastecimiento = null;
    this.linkSolicitudReabastecimiento = "";
  }

  verDetalleRegistroEnBuzon(bzE){
    this.isVisibleRegistroBuzon = true;
    this.registroRecepcionSolicitudReabastecimiento  = bzE.registro;
    this.linkSolicitudReabastecimiento = 'http://localhost:8085/restaurantSXXI/imagenes-rxxi/reportes/'+ bzE.registro.reporte.nombre_creacion + "#toolbar=0"

    console.log('url', this.linkSolicitudReabastecimiento);
    console.log('bzE', bzE);
  }

  aprobarSolicitud(){
    console.log('registroRecepcionSolicitudReabastecimiento', this.registroRecepcionSolicitudReabastecimiento);
    let registroNuevo = {
      descripcion : this.registroRecepcionSolicitudReabastecimiento['descripcion'],
      id_estado_registro : 3, //estado_registro 2 = Recepcionar solicitud de reabastecimiento (bodega)
      id_modulo : 2,
      id_registro_padre : this.registroRecepcionSolicitudReabastecimiento['id_registro'],
      id_tipo_registro : 1, //tipo_registro 1 = Solicitud de reabastecimiento
      id_usuario : this.usuarioLogeado,
      titulo_registro : this.registroRecepcionSolicitudReabastecimiento['titulo_registro'],
      version : this.registroRecepcionSolicitudReabastecimiento['version'] + 1,
      id_reporte : this.registroRecepcionSolicitudReabastecimiento['reporte']['id_reporte']
    }
    let registroAntiguo = {
      "id_registro" : this.registroRecepcionSolicitudReabastecimiento['id_registro']
    }
    console.log('registroNuevo', registroNuevo);
    console.log('registroAntiguo', registroAntiguo);

    this.bodegaService.crearRegistro(registroNuevo).subscribe(resp=>{
      console.log('resp crearRegistro()', resp);
    })

    this.bodegaService.actualizarUltimaVersionRegistro(registroAntiguo).subscribe(resp=>{
      console.log('resp actualizarUltimaVersionRegistro()', resp);
    })

    this.isVisibleDetalleRegistro = false;
    this.obtenerSolicitudReabastecimiento();
  }

  quitarUltimaVersionFalseBuzon(){
    this.buzonEntrada = this.buzonEntrada.filter( b=> {
      return b.registro['ultima_version'] != false
    })
  }
}
