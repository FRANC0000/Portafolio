import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Boleta, PagosReabastecimiento, Pedido, ProductoEnCarro } from 'src/app/interfaces/carrito-compras';
import { Plato, Producto } from 'src/app/interfaces/cocina';
import { FinanzasService } from './finanzas.service';

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { Reporte } from 'src/app/interfaces/reporte';
pdfMake.vfs =  pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.scss']
})
export class FinanzasComponent implements OnInit {

  constructor(private finanzasService : FinanzasService, 
    private nzNotificacionService : NzNotificationService,
    private router: Router) { }

  usuarioLogeado :string = localStorage.getItem('id_usuario');
  rolUsuarioLogeado : string = localStorage.getItem('rol');

  boletasPorPagarEnCaja = [];
  boletaAPagarSelected : Boleta;
  pedidoEnBoleta = [];
  isVisibleAbrirCaja = false;
  dineroConElQuePago : number;
  dineroPorPagar : number = null;
  vueltoAEntregar : number = null;
  resumenPago = false;
  isVisibleEntregarVuelto = false;
  listaRegistrosRecepcionSolicitudReabastecimientoFinanzas = [];
  isVisibleDetalleRegistro = false;
  isVisibleDetalleRegistroNoUltimaVersion = false;
  registroRecepcionSolicitudReabastecimiento;
  linkSolicitudReabastecimiento = "";
  isVisibleEnviarPresupuestoAjustado = false;
  listaProductos : Producto[] = [];
  listModificarReabastecimiento = []
  productoSelected;
  addProd = false;
  puedeEnviarSolicitudModificada = false;
  now = new Date();
  formDataPdfReporte = new FormData();
  boletasPagoReabastecimiento = []
  listPagosReabastecimiento = [];
  

  ngOnInit() {
    console.log('usuarioLogeado', this.usuarioLogeado);
    console.log('rolUsuarioLogeado', this.rolUsuarioLogeado);
    this.obtenerBoletasPorPagarEnCaja();
    this.obtenerSolicitudReabastecimiento();
    this.obtenerProductos();
    this.obtenerBoletasPago1Reabastecimiento();
    this.obtenerBoletasPago2Reabastecimiento();
  }

  obtenerBoletasPorPagarEnCaja(){
    this.finanzasService.obtenerBoletasPorPagarEnCaja().subscribe(resp=>{
      this.boletasPorPagarEnCaja = resp['boleta'].sort(function(a,b){
        if(a.hora_emision > b.hora_emision){
          return 1
        }
        if(a.hora_emision < b.hora_emision){
          return -1
        }
        return 0;
      });
      console.log('boletasPorPagarEnCaja', this.boletasPorPagarEnCaja);

    })
  }

  obtenerBoletasPago1Reabastecimiento(){
    this.finanzasService.obtenerBoletasPago1Reabastecimiento().subscribe(resp=>{
      let boletasPago1Reabastecimiento = resp['boleta'].sort(function(a,b){
        if(a.hora_emision > b.hora_emision){
          return 1
        }
        if(a.hora_emision < b.hora_emision){
          return -1
        }
        return 0;
      });
      console.log('boletasPago1Reabastecimiento', boletasPago1Reabastecimiento);
      if (boletasPago1Reabastecimiento.length > 0){
        for (let bol of boletasPago1Reabastecimiento){
          let pagosReabastecimiento : PagosReabastecimiento = {
            boleta : bol,
            esPago1 : true,
            esPago2 : false
          }
          this.listPagosReabastecimiento.push(pagosReabastecimiento);
        }
      }
      console.log('listPagosReabastecimiento', this.listPagosReabastecimiento);
    })
  }

  obtenerBoletasPago2Reabastecimiento(){
    this.finanzasService.obtenerBoletasPago2Reabastecimiento().subscribe(resp=>{
      let boletasPago2Reabastecimiento = resp['boleta'].sort(function(a,b){
        if(a.hora_emision > b.hora_emision){
          return 1
        }
        if(a.hora_emision < b.hora_emision){
          return -1
        }
        return 0;
      });
      console.log('boletasPago2Reabastecimiento', boletasPago2Reabastecimiento);
      if (boletasPago2Reabastecimiento.length > 0){
        for (let bol of boletasPago2Reabastecimiento){
          let pagosReabastecimiento : PagosReabastecimiento = {
            boleta : bol,
            esPago1 : false,
            esPago2 : true
          }
          this.listPagosReabastecimiento.push(pagosReabastecimiento);
        }
      }
      console.log('listPagosReabastecimiento', this.listPagosReabastecimiento);
    })
  }

  abrirCaja(boleta){
    console.log('abrirCaja');
    this.isVisibleAbrirCaja = true;
    console.log('boleta', boleta);
    this.boletaAPagarSelected = {
      fechaAtencion : boleta.fecha_atencion,
      horaAtencion : boleta.hora_atencion,
      idUsuario : boleta.id_usuario,
      rutCliente : boleta.id_cliente,
      subtotal : boleta.subtotal,
      descuentos : boleta.descuentos,
      extras : boleta.extras,
      horaEmision : boleta.hora_emision,
      id_boleta : boleta.id_boleta,
      idEstadoBoleta : boleta.id_estado_boleta,
      idTipoPago : boleta.id_tipo_pago,
      total : boleta.total
    };
    console.log('this.boletaAPagarSelected', this.boletaAPagarSelected);
    
    this.obtenerPedidosPorIdBoleta(boleta.id_boleta);
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
    localStorage.clear();
  }

  cancelarAbrirCaja(){
    console.log('cancelarAbrirCaja');
    this.isVisibleAbrirCaja = false;
    this.pedidoEnBoleta = [];
    this.boletaAPagarSelected = null
    this.dineroConElQuePago = null
    this.dineroPorPagar = null
    this.vueltoAEntregar = null
  }
  
  okAbrirCaja(){
    console.log('okAbrirCaja');
    if (this.dineroPorPagar == 0 && this.vueltoAEntregar == 0){
      console.log('El cliente no debe dinero, tampoco debes vuelto. Pagado!');
      this.nzNotificacionService.create(
        'success', 'Pagado', 'Se ha cerrado esta boleta #'+this.boletaAPagarSelected.id_boleta
      );
      
      this.boletaAPagarSelected.idEstadoBoleta = 3

      const boleta = {
        "boleta": this.boletaAPagarSelected
      }
      console.log('boleta', boleta);

      const transaccion = {
        "rut_cliente" : this.boletaAPagarSelected.rutCliente,
        "id_boleta" : this.boletaAPagarSelected.id_boleta,
        "valor" : this.boletaAPagarSelected.total,
        "id_cartera_pagos" : "-1",
      }

      this.finanzasService.crearTransaccion(transaccion).subscribe(resp3 =>{
        console.log('resp', resp3);
      })

      this.finanzasService.modificarBoleta(boleta).subscribe(resp => {
        console.log('resp', resp);
        this.resumenPago = true;
        this.isVisibleAbrirCaja = false;

        setTimeout(() => {
          this.obtenerBoletasPorPagarEnCaja();
          this.pedidoEnBoleta = [];
          this.boletaAPagarSelected = null;
          this.dineroConElQuePago = null;
          this.dineroPorPagar = null;
          this.vueltoAEntregar = null;
          this.resumenPago = false;
        }, 10000);
      })
    }
    else if (this.dineroPorPagar > 0 && this.vueltoAEntregar == 0){
      console.log('El cliente debe dinero, tú no le debes vuelto. No se puede pagar');
      this.nzNotificacionService.create(
        'warning', 'El cliente debe dinero', 'El cliente debe : $'+this.dineroPorPagar
      );
      
    }
    else if (this.dineroPorPagar == 0 && this.vueltoAEntregar > 0){
      console.log('Le debes vuelto al cliente');
      this.nzNotificacionService.create(
        'warning', 'Debes entregar vuelto al cliente', 'Le debes : $'+this.vueltoAEntregar
      );
      this.isVisibleEntregarVuelto = true;
      
    }
  }

  obtenerPedidosPorIdBoleta(idBoleta){
    
    const id_boleta = {
      "id_boleta" : idBoleta
    }
    this.finanzasService.obtenerPedidosPorIdBoleta(id_boleta).subscribe(resp=>{
      // console.log('resp obtenerPedidosPorIdBoleta', resp);
      this.pedidoEnBoleta = [];
      let pedidos = Object(resp["pedidos"]);
      let sumaPedidosEntregados = 0;
      // console.log('pedidos', pedidos);
      for (let pedido of pedidos){
        if (pedido.id_estado_instancia === 4){
          sumaPedidosEntregados +=1;
        }
        // console.log('pedido', pedido);
        // console.log('pedido', pedido.platos_del_pedido);
        // console.log('pedido', pedido.productos_del_pedido);
        const carroDeCompras : ProductoEnCarro[] = []
        for (let plato of Object(pedido.platos_del_pedido)){
          // console.log('plato', plato);
          let platoEnCarro : ProductoEnCarro;
          const unPlato : Plato = {
            id_plato : plato.id_plato,
            cantidad_personas_recomendadas : plato.cantidad_personas_recomendadas,
            comentario : plato.comentario_plato,
            descripcion_plato : plato.descripcion_plato,
            disponibilidad : plato.disponibilidad_plato,
            id_tipo_plato : plato.id_tipo_plato,
            nombre_plato : plato.nombre_plato,
            precio_plato : plato.precio_plato
          }
          platoEnCarro = {
            plato : unPlato,
            cantidad : plato.cantidad_platos_en_pedido,
            esPlato : true,
            esProducto : false,
            valorUnitario : plato.precio_plato
          }
          carroDeCompras.push(platoEnCarro);
        }

        for (let producto of Object(pedido.productos_del_pedido)){
          // console.log('producto', producto);
          let prodEnCarro : ProductoEnCarro;
          const unProducto : Producto = {
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
          prodEnCarro = {
            producto : unProducto,
            cantidad : producto.cantidad_productos_en_pedido,
            esPlato : false,
            esProducto : true,
            valorUnitario : producto.valor_unitario_producto
          }
          carroDeCompras.push(prodEnCarro);          
        }
        // console.log('carroDeCompras', carroDeCompras);
        
        const unPedido :Pedido = {
          fechaIngreso : pedido.fecha_ingreso,
          idBoleta : pedido.id_boleta,
          rutCliente : pedido.id_cliente,
          idEstadoIinstancia : pedido.id_estado_instancia,
          idMesa : pedido.id_mesa,
          idPedido : pedido.id_pedido,
          subtotal : pedido.subtotal,
          carritoProductos : carroDeCompras,
          nombreEstadoInstancia : pedido.nombre_estado_instancia
        }
        // console.log('unPedido.idPedido', unPedido.idPedido);
        // console.log('unPedido', unPedido);
        // console.log('------------');
        this.pedidoEnBoleta.push(unPedido);
      }
      console.log('pedidoEnBoleta', this.pedidoEnBoleta);
    })
  }

  onChangeDineroPago(){
    // console.log('dineroConElQuePago', this.dineroConElQuePago);
    this.dineroPorPagar = this.boletaAPagarSelected.total;
    this.dineroPorPagar -= this.dineroConElQuePago;
    this.vueltoAEntregar = this.dineroConElQuePago - this.boletaAPagarSelected.total

    if (this.dineroPorPagar < 0){
      this.dineroPorPagar = 0;
    }

    if (this.vueltoAEntregar < 0){
      this.vueltoAEntregar = 0;
    }
  }

  cerrarResumenPago(){
    this.resumenPago = false;
  }

  cancelarEntregarVuelto(){
    this.isVisibleEntregarVuelto = false;
    console.log('cancelarEntregarVuelto');
    
  }

  okEntregarVuelto(){
    this.isVisibleEntregarVuelto = false;
    console.log('okEntregarVuelto');

    const transaccion = {
      "rut_cliente" : this.boletaAPagarSelected.rutCliente,
      "id_boleta" : this.boletaAPagarSelected.id_boleta,
      "valor" : this.vueltoAEntregar,
      "id_cartera_pagos" : "-2", //id de entrega de vuelto
    }

    this.finanzasService.crearTransaccion(transaccion).subscribe(resp3 =>{
      console.log('resp', resp3);

      this.vueltoAEntregar = 0;

      this.nzNotificacionService.create(
        'success', 'Entrega de vuelto', 'Se ha registrado esta transacción #'+resp3
      );
    })
  }

  obtenerSolicitudReabastecimiento(){
    this.listaRegistrosRecepcionSolicitudReabastecimientoFinanzas = []
    this.finanzasService.obtenerSolicitudReabastecimientoFinanzas().subscribe(resp=>{
      this.listaRegistrosRecepcionSolicitudReabastecimientoFinanzas = resp['registros'].filter(r =>{
        return r.ultima_version == true
      })

      console.log('listaRegistrosRecepcionSolicitudReabastecimientoFinanzas', this.listaRegistrosRecepcionSolicitudReabastecimientoFinanzas);
    })
  }

  verDetalleRegistro(reg){
    this.isVisibleDetalleRegistro = true;
    this.registroRecepcionSolicitudReabastecimiento  = reg;
    this.linkSolicitudReabastecimiento = 'http://localhost:8085/restaurantSXXI/imagenes-rxxi/reportes/'+ reg.reporte.nombre_creacion + "#toolbar=0"
    // console.log('url', this.linkSolicitudReabastecimiento);
    console.log('reg', reg);
  }

  verDetalleRegistroNoUltimaVersion(reg){
    this.isVisibleDetalleRegistroNoUltimaVersion = true;
    this.registroRecepcionSolicitudReabastecimiento  = reg;
    this.linkSolicitudReabastecimiento = 'http://localhost:8085/restaurantSXXI/imagenes-rxxi/reportes/'+ reg.reporte.nombre_creacion + "#toolbar=0"
    // console.log('url', this.linkSolicitudReabastecimiento);
    console.log('reg', reg);
  }

  cerrarDrawerDetalleSolicitudReabastecimiento(){
    this.isVisibleDetalleRegistro = false;
    this.isVisibleDetalleRegistroNoUltimaVersion = false;
    this.registroRecepcionSolicitudReabastecimiento = null;
  }

  isVisibleAprobarSolicitud = false;

  cancelarAprobarSolicitud(){
    this.isVisibleAprobarSolicitud = false;
  }

  okAprobarSolicitud(reg){
    console.log('Aprobar solicitud');
    console.log('Ingresar solicitud al sistema');
    let registroNuevo = {
      descripcion : this.registroRecepcionSolicitudReabastecimiento['descripcion'],
      id_estado_registro : 4, //estado_registro 2 = Recepcionar solicitud de reabastecimiento (bodega)
      id_modulo : 5,
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

    this.finanzasService.crearRegistro(registroNuevo).subscribe(resp=>{
      console.log('resp crearRegistro()', resp);
    })

    this.finanzasService.actualizarUltimaVersionRegistro(registroAntiguo).subscribe(resp=>{
      console.log('resp actualizarUltimaVersionRegistro()', resp);
    })
    
    console.log('Ingresar presupuesto de gastos');

    
    this.obtenerSolicitudReabastecimiento();
    this.isVisibleDetalleRegistro = false;
  }

  rechazarSolicitud(reg){
    console.log('Rechazar solicitud');
    this.isVisibleEnviarPresupuestoAjustado = true;
    this.listModificarReabastecimiento = [];
  }

  obtenerProductos(){
    this.finanzasService.obtenerProductos().subscribe(resp=>{
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

  cancelarEnviarPresupuestoAjustado(){
    this.isVisibleEnviarPresupuestoAjustado = false;
  }

  okEnviarPresupuestoAjustado(){
    console.log('okEnviarPresupuestoAjustado');
    
  }

  addFila(){
    // console.log('producto', this.productoSelected);
    let sri = Math.trunc((this.productoSelected.stock_producto * 100)/ this.productoSelected.stock_ideal)
    let fila = [''+this.productoSelected.id_producto,
                ''+this.productoSelected.nombre_producto,
                ''+this.productoSelected.medida_producto,
                ''+this.productoSelected.stock_ideal,
                ''+this.productoSelected.stock_producto,
                ''+sri+'%',
                ''+this.productoSelected.valor_unitario,
                '',
                ''
              ]
    // console.log('fila',fila);
    this.listModificarReabastecimiento.push(fila)

    this.addProd = false;
    this.puedeEnviarSolicitudModificada = false;
    this.productoSelected = null
  }

  onChangeCantidadComprar(ev, row){
  // console.log('onChangeCantidadComprar', ev);
  // console.log('onChangeCantidadComprar', row);
    if (ev != null && ev > 0){
      this.listModificarReabastecimiento.find(p =>{
        if (p[0] === row[0]){
          // console.log('p6 ' + parseInt(p[6]));
          p[8] = (parseInt(p[6]) * parseInt(ev));
        }
      })
      this.puedeEnviarSolicitudModificada = true;
    }
    else{
      this.listModificarReabastecimiento.find(p => {
        if (ev <= 0 || ev == null){
          if (p[0] === row[0]){
            p[8] = 0;
          }
        }
      })
      this.puedeEnviarSolicitudModificada = false;
    }
  }
  
  activarBtn(){
    this.addProd = true;
  }

  enviarSolicitudModificada(){
    console.log('this.listModificarReabastecimiento', this.listModificarReabastecimiento);
    console.log('pdf');

    this.formDataPdfReporte = new FormData();
    let tabla = [];
    let headerTabla = ['#', 'Nombre', 'Medida', 'Stock ideal', 'Stock actual', '%S.R.I.', 'Valor un.', 'Cant. comprar', 'Valor X Cant']
    tabla.push(headerTabla);

    let totalAComprar = 0;
    for (let i of this.listModificarReabastecimiento) {
      totalAComprar += parseInt(i[8])
      tabla.push(i)
    }
    console.log('tabla', tabla);

    let tabla2 =  []
    tabla2.push(['Total'])
    tabla2.push(['$'+totalAComprar])
    console.log('tabla2', tabla2);

    let nombre_creacion ="Reporte_reabastecimiento_"+this.now.getDate()+this.now.getMonth()+this.now.getFullYear()+this.now.getHours()+this.now.getMinutes()+"_"+this.usuarioLogeado+'.pdf';


    const pdfDefinitions :any = {
      content: [
        {
          text: 'Reporte de reabastecimiento modificado', alignment: 'center', style: 'header',
          margin: [0, 10, 0, 30]
        },
        {
          text: 'Este reporte de reabastecimiento fue generado el día ' + this.now.toLocaleString() + ' por el usuario ' + this.usuarioLogeado + ' y representan los productos que requieren de reabastecerse. El anterior reporte de reabastecimiento fue generado por ' + this.registroRecepcionSolicitudReabastecimiento['id_usuario'] + ' el día ' + this.registroRecepcionSolicitudReabastecimiento['fecha_instancia']+ '. Este documento será utilizado para gestión y apoyo en la toma de decisiones del propio Restaurant Siglo XXI.' , 
          margin: [0, 0, 0, 20] //izquierda, arriba, derecha, abajo
        },
        {
          table: {
            body: tabla
          }
        },
        {
          table : {
            body: tabla2
          }, margin: [455, 10, 0, 0]
        }
      ],
      footer: [
        {
          text: 'TLNS S.A.', alignment: 'center', fontSize: 10
        },
        {
          text: this.now.getFullYear(),  alignment: 'center', fontSize: 8,
          margin: [0, 5, 0, 0]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        }
      }
    }

    const pdf = pdfMake.createPdf(pdfDefinitions)
    // pdf.open()

    pdf.getBlob((blob) => {
      // console.log('blob', blob);
      this.formDataPdfReporte.append("fichero", blob);
      this.formDataPdfReporte.append("nombre", nombre_creacion);
      this.finanzasService.subirPdfReporte(this.formDataPdfReporte).subscribe(resp =>{
        // console.log('resp', resp);
      })
    });


    let registroNuevo = {
      descripcion : this.registroRecepcionSolicitudReabastecimiento['descripcion'],
      id_estado_registro : 6, //estado_registro 2 = Recepcionar solicitud de reabastecimiento (bodega)
      id_modulo : 5,
      id_registro_padre : this.registroRecepcionSolicitudReabastecimiento['id_registro'],
      id_tipo_registro : 1, //tipo_registro 1 = Solicitud de reabastecimiento
      id_usuario : this.usuarioLogeado,
      titulo_registro : 'Modificación: '+this.registroRecepcionSolicitudReabastecimiento['titulo_registro'],
      version : this.registroRecepcionSolicitudReabastecimiento['version'] + 1,
      id_reporte : -1
    }
    let registroAntiguo = {
      "id_registro" : this.registroRecepcionSolicitudReabastecimiento['id_registro']
    }

    // console.log('json pdf string', JSON.stringify(pdfDefinitions));
    // console.log('json datos tabla string', JSON.stringify(tabla));

    const reporteACrear : Reporte = {
      comentario : 'Reporte modificado del '+this.registroRecepcionSolicitudReabastecimiento['fecha_instancia'].toString(),
      extension : ".pdf",
      fecha_creacion : this.now.toLocaleDateString(),
      id_tipo_reporte : 4,
      id_usuario : this.usuarioLogeado,
      nombre_creacion : nombre_creacion,
      titulo_reporte : 'Sugerencia de reabastecimiento: '+this.registroRecepcionSolicitudReabastecimiento['titulo_registro'],
    }
    console.log('reporteACrear: ', reporteACrear);
    console.log('registroNuevo', registroNuevo);
    console.log('registroAntiguo', registroAntiguo);

    this.finanzasService.crearReporte(reporteACrear).subscribe(resp => {
      console.log('resp:', resp);
      // this.cerrarCrearReporte();
      registroNuevo.id_reporte = parseInt(resp);

      this.finanzasService.crearRegistro(registroNuevo).subscribe(resp2 => {
        console.log('resp2', resp2);
        this.nzNotificacionService.create(
          'success', 'Registro creado',
          resp2.toString()
          // ''
        );

        this.finanzasService.actualizarUltimaVersionRegistro(registroAntiguo).subscribe(resp => {
          console.log('resp actualizarUltimaVersionRegistro()', resp);
        })
      },
        error => {
          // console.log('error', error); 
          this.nzNotificacionService.create(
            'error', 'Error al crear registro', 'No es posible crear el registro, intente nuevamente'
          )
        });

      this.nzNotificacionService.create(
        'success', 'Reporte creado',
        resp.toString()
        // ''
      );
    },
      error => {
        // console.log('error', error); 
        this.nzNotificacionService.create(
          'error', 'Error al crear reporte', 'No es posible crear el reporte, intente nuevamente'
        )
      });

    
    this.isVisibleDetalleRegistro = false;
    this.isVisibleEnviarPresupuestoAjustado = false;
    this.listModificarReabastecimiento = [];
    this.obtenerSolicitudReabastecimiento();
  }

  eliminarFila(row){
    let index = this.listModificarReabastecimiento.findIndex( p =>{
      return p[0] == row[0]
    })
    console.log('index', index);
    this.listModificarReabastecimiento.splice(index, 1);
  }
}
