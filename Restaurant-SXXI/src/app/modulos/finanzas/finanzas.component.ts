import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Boleta, Pedido, ProductoEnCarro } from 'src/app/interfaces/carrito-compras';
import { Plato, Producto } from 'src/app/interfaces/cocina';
import { FinanzasService } from './finanzas.service';

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

  ngOnInit() {
    console.log('usuarioLogeado', this.usuarioLogeado);
    console.log('rolUsuarioLogeado', this.rolUsuarioLogeado);
    this.obtenerBoletasPorPagarEnCaja();
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
}
