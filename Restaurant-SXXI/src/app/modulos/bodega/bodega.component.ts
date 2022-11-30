import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Pedido, ProductoEnCarro } from 'src/app/interfaces/carrito-compras';
import { Plato, Producto, Receta } from 'src/app/interfaces/cocina';
import { BuzonEntrada } from 'src/app/interfaces/registro';
import { BodegaService } from './bodega.service';

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.component.html',
  styleUrls: ['./bodega.component.scss']
})
export class BodegaComponent implements OnInit {

  constructor(private router: Router,
    private bodegaService : BodegaService,
    private notification: NzNotificationService) {}

  usuarioLogeado :string = localStorage.getItem('id_usuario');
  rolUsuarioLogeado : string = localStorage.getItem('rol');

  listaProductos : Producto[] = [];
  productoSelected ;
  listaRegistrosRecepcionSolicitudReabastecimiento;
  isVisibleDetalleRegistro = false;
  registroRecepcionSolicitudReabastecimiento;
  linkSolicitudReabastecimiento = "";
  listaRegistrosRecepcionSolicitudReabastecimientoAprobada = [];
  listaRegistrosRecepcionSolicitudIngredientes = [];
  buzonEntrada : BuzonEntrada[] = []
  isVisibleRegistroBuzon = false;
  registroSeleceted;
  listaRegistrosRecepcionSolicitudReabastecimientoModificada = []
  listaRegistrosRecepcionSolicitudReabastecimientoRechazada = [];
  listaobtenerSolicitudReabastecimientoProveedores = [];
  isVisibleDetallePedido = false;
  pedidoSelected ;
  listaRecetas : Receta[] = [];

  ngOnInit() {
    console.log('usuarioLogeado', this.usuarioLogeado);
    console.log('rolUsuarioLogeado', this.rolUsuarioLogeado);
    this.obtenerProductos();
    this.obtenerRecetas();
    this.obtenerSolicitudReabastecimiento();
    this.obtenerSolicitudReabastecimientoAprobada();
    this.obtenerSolicitudReabastecimientoModificada();
    this.obtenerSolicitudReabastecimientoRechazada();
    this.obtenerSolicitudReabastecimientoProveedores();
    this.obtenerSolicitudIngredientes();
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
    this.listaRegistrosRecepcionSolicitudReabastecimiento = [];
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
          esRechazado : false,
          esIngrediente : false
        }
        this.buzonEntrada.push(bzE);
      }
      this.quitarUltimaVersionFalseBuzon();
      console.log('buzon',this.buzonEntrada);
    })    
  }

  obtenerSolicitudIngredientes(){
    this.bodegaService.obtenerSolicitudIngredientes().subscribe(resp=>{
      this.listaRegistrosRecepcionSolicitudIngredientes = resp['registros']

      console.log('listaRegistrosRecepcionSolicitudIngredientes', this.listaRegistrosRecepcionSolicitudIngredientes);

      for (let reg of this.listaRegistrosRecepcionSolicitudIngredientes){
        let bzE : BuzonEntrada = {
          registro : Object(reg),
          esAprobado : false,
          esRechazado : false,
          esEnviada : false,
          esIngrediente : true
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
          esEnviada : false,
          esIngrediente : false
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
          esEnviada : false,
          esIngrediente : false
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
          esIngrediente : false
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

  obtenerPedidoPorId(id_pedido){
    this.bodegaService.obtenerPedidoPorId(id_pedido).subscribe(resp=>{
      console.log('resp', resp);
      
    })
  }

  verDetallePedidoEnBuzon(bzE){
    this.isVisibleDetallePedido = true;
    let registro = bzE.registro;
    let idPedido = parseInt(bzE.registro['descripcion'])
    this.bodegaService.obtenerPedidoPorId(idPedido).subscribe(resp => {
      console.log('resp', resp);
      let pedido = resp['pedidos'];
      let carritoDeUnPedido : ProductoEnCarro[] = [];

        pedido.platos_del_pedido.forEach(plato => {
          let rec : Receta[] = [];
          let recetaSelecccionada = []
          if (plato.recetas_pedidas != undefined){
            let recetaSelecccionada = JSON.parse(plato.recetas_pedidas)
            // console.log('recetaSelecccionada',recetaSelecccionada);
            for (let receta of recetaSelecccionada) {
              let r = this.listaRecetas.filter(r => {
                return r.id_receta === receta
              })
              // console.log('r', r);
              
              rec.push(r[0])
              // console.log('recetaSelecccionada', recetaSelecccionada);
            }
          }
          // console.log('rec', rec);

          const unPlatoPedido : Plato = {
            cantidad_personas_recomendadas : plato.cantidad_personas_recomendadas,
            comentario : plato.comentario_plato,
            descripcion_plato : plato.descripcion_plato,
            disponibilidad : plato.disponibilidad_plato,
            id_plato : plato.id_plato,
            id_tipo_plato : plato.id_tipo_plato,
            nombre_plato : plato.nombre_plato,
            precio_plato : plato.precio_plato
          }

          const platoEnCarro : ProductoEnCarro = {
            cantidad : plato.cantidad_platos_en_pedido,
            esPlato : true,
            esProducto : false,
            valorUnitario : plato.precio_plato,
            plato : unPlatoPedido,
            recetaSeleccionada : recetaSelecccionada,
            objetoRecetaSeleccionada : rec
          }

          carritoDeUnPedido.push(platoEnCarro);
        })

        pedido.productos_del_pedido.forEach(producto => {
          const unProductoPedido : Producto = {
            comentario : producto.comentario_producto,
            fecha_ingreso_producto : producto.fecha_ingreso_producto,
            fecha_vencimiento : producto.fecha_vencimiento_producto,
            id_producto : producto.id_producto,
            id_tipo_producto : producto.id_tipo_producto,
            medida_producto : producto.medida_producto,
            nombre_producto : producto.nombre_producto,
            stock_producto : producto.stock_producto,
            valor_unitario : producto.valor_unitario_producto
          }

          const productoEnCarro : ProductoEnCarro = {
            cantidad: producto.cantidad_productos_en_pedido,
            esPlato : false,
            esProducto : true,
            valorUnitario : producto.valor_unitario_producto,
            producto : unProductoPedido
          }
          carritoDeUnPedido.push(productoEnCarro);
        })

        const unPedido : Pedido ={
          fechaIngreso : pedido.fecha_ingreso,
          idEstadoIinstancia: pedido.id_estado_instancia,
          idMesa: pedido.id_mesa,
          rutCliente : pedido.id_cliente,
          idBoleta : pedido.id_boleta,
          idPedido : pedido.id_pedido,
          nombreEstadoInstancia : pedido.nombre_estado_instancia,
          subtotal : pedido.subtotal,
          carritoProductos : carritoDeUnPedido
        }

        this.pedidoSelected = unPedido
        console.log('pedido', this.pedidoSelected);
        
    })
  }

  cerrarDetallePedidoEnBuzon(){
    this.isVisibleDetallePedido = false;
    this.pedidoSelected = null;
  }

  restarStock(){
    console.log('pedido', this.pedidoSelected);
    
    let carrito = {
      "carrito" : this.pedidoSelected.carritoProductos
    }

    this.bodegaService.carritoRestarStock(carrito).subscribe(resp =>{
      console.log('resp', resp);
      this.notification.create(
        'success', 'Receta creada', resp.toString()
      )
      
    })
  }

  obtenerRecetas(){
    this.listaRecetas = [];
    this.bodegaService.obtenerRecetas().subscribe(resp => {

      this.listaRecetas = resp["listado_recetas"].sort(function(a,b){
            if(a.id_receta < b.id_receta){
              return -1
            }
            if (a.id_receta > b.id_receta){
              return 1
            }
            return 0;
          })
      console.log('listaRecetas', this.listaRecetas);
    })
  }
}
