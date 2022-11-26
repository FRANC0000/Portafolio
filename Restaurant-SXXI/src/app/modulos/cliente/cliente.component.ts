import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router} from '@angular/router';
import { NzNotificationService, NzTreeHigherOrderServiceToken } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TimeHolder } from 'ng-zorro-antd/time-picker/time-holder';
import { parse } from 'querystring';
import { Boleta, InstanciarBoleta, InstanciarPedido, Pedido, ProductoEnCarro } from 'src/app/interfaces/carrito-compras';
import { Plato, Producto } from 'src/app/interfaces/cocina';
import { CancelarReserva, Cliente, EstadoMesa, Mesa, Reserva, TipoMesa } from 'src/app/interfaces/mesa';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  constructor(
    private ruta: ActivatedRoute,
    private clienteService : ClienteService,
    private router: Router,
    private nzMessageService: NzMessageService,
    private nzNotificacionService : NzNotificationService,
    private fb: FormBuilder,
  ) { 
    this.ruta.params.subscribe(params => {
      console.log('idMesa: ', params['idMesa']);
      this.idMesaParam = params['idMesa']
    })
  }
  
  idMesaParam
  mesaObjectParam : Mesa;
  reservaObjectParam : Reserva;
  clienteObjectParam : Cliente;
  boletaObjectParam : Boleta;
  mesaReservada :boolean = false;
  listaPlatos : Plato;
  listaProductos : Producto;
  carritoDeCompras : ProductoEnCarro[] = [];
  visibleDetallePlato = false;
  visibleCarritoCompras = false;
  visibleBoleta = false;
  platoSelected : Plato;
  productoSelected : Producto;
  cantidadProductoAgregarAlCarro = 1;
  pedidoAIngresar : Pedido;
  now : Date;
  pedidoEnBoleta : Pedido[] = [];
  boletaAIngresar : Boleta;
  clicksEnCarrito : number = 0;
  puedePagar = false;
  visiblePedirCuenta = false;
  propinaEnBoletaAPagar = true;
  formaDePago = '1';
  mode = 'month';
  validateFormPagoTarjeta : FormGroup
  resumenPago = false;
  dirigirseACaja = false;

  test = [1, 2, 3, 4]


  ngOnInit() {
    console.log('test',this.test.toString());
    
    this.mesaReservada = false;
    const id_mesa = {
      id_mesa : this.idMesaParam
    }
    this.obtenerUnaMesa(id_mesa);
    this.obtenerReservaActivaPorIdMesa(id_mesa);
    this.obtenerPlatos();
    this.obtenerProductos();
  }

  obtenerUnaMesa(id_mesa){
    this.clienteService.obtenerUnaMesa(id_mesa).subscribe(resp=>{
      // console.log('resp obtenerUnaMesa', resp);
      const tipoMesa :TipoMesa= {
        id_tipo_mesa : Object(resp).id_tipo_mesa,
        cantidad_asientos : Object(resp).cantidad_asientos,
        nombre_tipo_mesa : Object(resp).nombre_tipo_mesa
      }
      const estadoMesa : EstadoMesa = {
        id_estado_mesa : Object(resp).id_estado_mesa,
        nombre_estado_mesa : Object(resp).nombre_estado_mesa
      }
      this.mesaObjectParam = {
        tipoEstadoMesa : estadoMesa,
        id_mesa : Object(resp).id_mesa,
        tipoMesa : tipoMesa
      }
      console.log('mesaObjectParam', this.mesaObjectParam);
    });
  }

  obtenerReservaActivaPorIdMesa(id_mesa){
    this.clienteService.obtenerReservaActivaPorIdMesa(id_mesa).subscribe(resp=>{
      // console.log('resp obtenerReservaActivaPorIdMesa', resp);
      let reserva = Object(resp['arrayReserva']);
      // console.log('reserva', reserva);
      
      if (reserva.length > 0){
        this.mesaReservada = true;
        this.reservaObjectParam = {
          cant_consumidores : reserva[0].cant_consumidores,
          comentario : reserva[0].comentario,
          dv_cliente : reserva[0].dv_cliente,
          fecha_reserva : reserva[0].fecha_reserva,
          hora_reserva : reserva[0].hora_reserva,
          id_estado_reserva : reserva[0].id_estado_reserva,
          id_mesa : reserva[0].id_mesa,
          id_reserva : reserva[0].id_reserva,
          rut_cliente : reserva[0].rut_cliente
        }
        console.log('reservaObjectParam', this.reservaObjectParam);
        this.clienteObjectParam = {
          dv_cliente : reserva[0].dv_cliente,
          nombre_cliente : reserva[0].nombre_cliente,
          rut_cliente : reserva[0].rut_cliente
        }
        console.log('clienteObjectParam', this.clienteObjectParam);
        this.obtenerBoletaEnProcesoPorIdCliente(this.clienteObjectParam.rut_cliente);
      }
      else{
        console.log('Esta mesa está disponible y no tiene una reserva activa');
        this.mesaReservada = false;
      }
    })
  }

  obtenerBoletaEnProcesoPorIdCliente(rut_cliente){
    const id_cliente = {
      "id_cliente" : rut_cliente
    }

    this.clienteService.obtenerBoletaEnProcesoPorIdCliente(id_cliente).subscribe(resp =>{
      // console.log('resp obtenerBoletaEnProcesoPorIdCliente', resp);
      let boleta = Object(resp["boleta"]);
      // console.log('boleta', boleta);
      if (boleta.length > 0){
        this.boletaAIngresar = {
          id_boleta : boleta[0].id_boleta,
          fechaAtencion : boleta[0].fecha_atencion,
          horaAtencion : boleta[0].hora_atencion,
          idUsuario : boleta[0].id_usuario,
          rutCliente : boleta[0].id_cliente,
          subtotal : boleta[0].subtotal,
          descuentos : boleta[0].descuentos,
          extras : boleta[0].extras,
          horaEmision : boleta[0].hora_emision,
          idEstadoBoleta : boleta[0].id_estado_boleta,
          idTipoPago : boleta[0].id_tipo_pago,
          total : boleta[0].total
        }
        console.log('boletaAIngresar',this.boletaAIngresar);
        this.obtenerPedidosPorIdBoleta(boleta[0].id_boleta);
      }
    })
  }

  obtenerPedidosPorIdBoleta(idBoleta){
    const id_boleta = {
      "id_boleta" : idBoleta
    }
    this.clienteService.obtenerPedidosPorIdBoleta(id_boleta).subscribe(resp=>{
      this.pedidoEnBoleta = [];
      // console.log('resp obtenerPedidosPorIdBoleta', resp);
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
      if (this.pedidoEnBoleta.length === sumaPedidosEntregados){
        this.puedePagar = true;
      }
      console.log('pedidoEnBoleta', this.pedidoEnBoleta);

      let subtotalSumPedidos :number = 0;
      this.pedidoEnBoleta.forEach( p => {
        subtotalSumPedidos += p.subtotal;
      });
      console.log('subtotalSumPedidos',subtotalSumPedidos);

      this.boletaAIngresar.subtotal = subtotalSumPedidos;
    })
  }

  obtenerPlatos(){
    this.clienteService.obtenerPlatos().subscribe(resp=>{
      this.listaPlatos = resp['plato'].sort(function(a,b){
        if(a.disponibilidad < b.disponibilidad){
          return 1
        }
        if(a.disponibilidad > b.disponibilidad){
          return -1
        }
        return 0;
      });
      console.log('listaPlatos', this.listaPlatos);
    });
  }

  obtenerProductos(){
    this.clienteService.obtenerProductos().subscribe(resp=>{
      this.listaProductos = resp['productos'].filter((item) => item.nombre_tipo_producto.toLowerCase() !== 'ingrediente').sort(function(a,b){
        if(a.disponibilidad < b.disponibilidad){
          return 1
        }
        if(a.disponibilidad > b.disponibilidad){
          return -1
        }
        return 0;
      });;

      console.log('listaProductos', this.listaProductos);
    })
  }


  cancelarReserva(){
    console.log('aquí se cancelará la reserva');
    const cancelarReserva : CancelarReserva = {
      id_reserva : this.reservaObjectParam.id_reserva.toString()
    }

    this.clienteService.cancelarReserva(cancelarReserva).subscribe(resp =>{
      console.log('resp cancelarReserva', resp);

      if (resp.includes('cancelada con éxito')){
        this.mesaReservada = false;
      }
      
    })
  }

  terminarEstancia(){
    console.log('aquí se terminará la estancia y se setea la mesa en estado limpieza');
    const terminarEstancia : CancelarReserva = {
      id_reserva : this.reservaObjectParam.id_reserva.toString()
    }

    this.clienteService.terminarEstancia(terminarEstancia).subscribe(resp =>{
      console.log('resp terminarEstancia', resp);

      if (resp.includes('cancelada con éxito')){
        this.mesaReservada = false;
      }
      
    })
  }

  mostrarPedidosEnBoleta(){
    console.log('mostrarPedidosEnBoleta');
    this.obtenerPedidosPorIdBoleta(this.boletaAIngresar.id_boleta);
    console.log('pedidoEnBoleta', this.pedidoEnBoleta);
    
    this.visibleBoleta = true;
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
    localStorage.clear();
  }

  verDetallePlato(plato){
    this.visibleDetallePlato = true;
    this.platoSelected = plato;
    console.log('platoSelected', this.platoSelected);
  }

  seleccionarPlato(idPlato){
    console.log('idPlato', idPlato);
  }

  cerrarDrawerDetallePlato(){
    this.visibleDetallePlato = false;
  }

  cerrarDrawerCarritoCompras(){
    this.visibleCarritoCompras = false;
  }

  cerrarDrawerVerBoleta(){
    this.visibleBoleta = false;
  }

  verCarrito(){
    console.log('carritoDeCompras', this.carritoDeCompras);
    if (this.carritoDeCompras.length > 0){
      this.visibleCarritoCompras = true;
      setTimeout(() => {
        this.clicksEnCarrito = 0;
      }, 10000);
    }
    else{
      // console.log('clicks',this.clicksEnCarrito);
      this.clicksEnCarrito += 1;
      if (this.clicksEnCarrito <= 1){
        this.nzNotificacionService.create(
          'warning', 'Carrito sin items', 'No tienes productos en tu carrito'
        );
      }

    }
  }

  agregarPlatoAlCarro(plato){
    // console.log('plato', plato);
    // console.log(arr.some(e => e.foo === 'bar')); // true
    const existe = this.carritoDeCompras.some( p => {
      if (p.plato != null && p.plato != undefined){
        if (p.plato.id_plato === plato.id_plato){
          return true;
        }
        else{
          return false;
        }
      }
      else {
        return false;
      }
    })
    console.log('existe', existe);

    if (!existe){
      // console.log('no existe, agregar');
      console.log('plato', plato);
      
      if (plato.recetas.length > 0){
        // console.log('doc', document.getElementById(plato.id_plato));
        // console.log('model', document.getElementById(plato.id_plato).getAttribute('ngmodel'))
        let recetaSeleccionada = document.getElementById(plato.id_plato).getAttribute('ngmodel');
        const productoEnCarro : ProductoEnCarro = {
        plato: plato,
        cantidad : 1,
        esPlato : true,
        esProducto : false,
        valorUnitario : plato.precio_plato,
        recetaSeleccionada : [parseInt(recetaSeleccionada)]
        }
        this.carritoDeCompras.push(productoEnCarro);
      }
      else{
        const productoEnCarro : ProductoEnCarro = {
          plato: plato,
          cantidad : 1,
          esPlato : true,
          esProducto : false,
          valorUnitario : plato.precio_plato,
          recetaSeleccionada : []
          }
          this.carritoDeCompras.push(productoEnCarro);
      }
    }
    else{
      // console.log('existe, sumar 1');
      if (plato.recetas.length > 0){
        let recetaSeleccionada = document.getElementById(plato.id_plato).getAttribute('ngmodel');

        this.carritoDeCompras.find(p => {
          if (p.plato != null && p.plato != undefined){
            if (p.plato.id_plato === plato.id_plato){
              p.recetaSeleccionada.push(parseInt(recetaSeleccionada));
              p.cantidad += 1;
            }
          }
        })
      }
      else{
        this.carritoDeCompras.find(p => {
          if (p.plato != null && p.plato != undefined){
            if (p.plato.id_plato === plato.id_plato){
              p.cantidad +=1
            }
          }
        })
      }
    }
    console.log('carritoDeCompras', this.carritoDeCompras);
    this.crearPedidoAIngresar();
    this.nzMessageService.success('Plato añadido')
  }

  quitarPlatoDelCarro(item){
    console.log('eliminar plato', item);
    if (item.cantidad > 1){
      item.cantidad -= 1
    }
    else if (item.cantidad == 1){
      this.eliminarPlatoDelCarro(item.plato);
    }
    this.crearPedidoAIngresar();
    this.nzMessageService.success('Plato quitado')
  }

  eliminarPlatoDelCarro(plato){
    const platoIndex = this.carritoDeCompras.findIndex(o => {
      return o.plato == plato
    })
    
    if (platoIndex !== -1){
      this.carritoDeCompras.splice(platoIndex, 1)
    }
    console.log('carritoDeCompras', this.carritoDeCompras);
    if (this.carritoDeCompras.length == 0){
      this.cerrarDrawerCarritoCompras();
    }
  }

  eliminarProductoDelCarro(producto){
    const productoIndex = this.carritoDeCompras.findIndex(o => {
      return o.producto == producto
    })
    
    if (productoIndex !== -1){
      this.carritoDeCompras.splice(productoIndex, 1)
    }
    console.log('carritoDeCompras', this.carritoDeCompras);
    if (this.carritoDeCompras.length == 0){
      this.cerrarDrawerCarritoCompras();
    }
  }

  agregarProductoAlCarro(producto){
    // console.log('producto', producto);
    // console.log(arr.some(e => e.foo === 'bar')); // true
    const existe = this.carritoDeCompras.some( p => {
      if (p.producto != null && p.producto != undefined){
        if (p.producto.id_producto === producto.id_producto){
          return true;
        }
        else{
          return false;
        }
      }
      else {
        return false;
      }
    });
    console.log('existe', existe);

    if (!existe){
      // console.log('no existe, agregar');
      const productoEnCarro : ProductoEnCarro = {
      producto: producto,
      cantidad : 1,
      esPlato : false,
      esProducto : true,
      valorUnitario : producto.valor_unitario
      }
      this.carritoDeCompras.push(productoEnCarro);
    }
    else{
      // console.log('existe, sumar 1');
      this.carritoDeCompras.find(p => {
        if(p.producto != null && p.producto != undefined){
          if (p.producto.id_producto === producto.id_producto){
            p.cantidad +=1
          }
        }
      })
    }
    console.log('carritoDeCompras', this.carritoDeCompras);
    this.crearPedidoAIngresar();
    this.nzMessageService.success('Producto añadido')
  }

  quitarProductoDelCarro(item){
    console.log('eliminar producto', item);

    if (item.cantidad > 1){
      item.cantidad -= 1
    }
    else if (item.cantidad == 1){
      this.eliminarProductoDelCarro(item.producto);
    }
    console.log('carritoDeCompras', this.carritoDeCompras);
    this.crearPedidoAIngresar();
    this.nzMessageService.success('Producto quitado')
  }

  confirmarPedido(){
    console.log('confirmarPedido');
    console.log('pedidoAIngresar', this.pedidoAIngresar);
    console.log('carritoDeCompras', this.carritoDeCompras);
    this.instanciarBoletaYPedido();
    this.visibleCarritoCompras = false;
  }

  confirmarPago(){
    console.log('confirmarPago');
    this.now = new Date();

    this.boletaAIngresar.descuentos = 0;
    this.boletaAIngresar.horaEmision = this.now.toLocaleTimeString();

    if (this.boletaAIngresar.extras === -1){
      this.boletaAIngresar.extras = 0
    }

    if (this.formaDePago == '1'){
      this.boletaAIngresar.idTipoPago = 1;
    }
    else if (this.formaDePago == '2'){
      this.boletaAIngresar.idTipoPago = 2;
    }
    else if(this.formaDePago == '3'){
      this.boletaAIngresar.idTipoPago = 3;
    }

    if (this.boletaAIngresar.idTipoPago == 2 || this.boletaAIngresar.idTipoPago == 3){
      //SIGNIFICA QUE PAGA CON TARJETA POR LO TANTO DEBEMOS SIMULAR UNA COMPRA CON TARJETA
      if(this.validateFormPagoTarjeta.valid){
        this.nzNotificacionService.create(
          'success', 'Tarjeta válida', 'Pago aprobado'
        );
        
        this.boletaAIngresar.idEstadoBoleta = 3
        console.log('boletaAIngresar', this.boletaAIngresar);
        const boleta = {
          "boleta": this.boletaAIngresar
        }
        this.clienteService.modificarBoleta(boleta).subscribe(resp =>{
          console.log('resp modificarBoleta', resp);

          const carteraPagos = {
            "rut_cliente" : this.clienteObjectParam.rut_cliente,
            "nro_tarjeta" : this.validateFormPagoTarjeta.value.numero_tarjeta,
            "mes_exp" : this.validateFormPagoTarjeta.value.mes_expiracion,
            "anno_exp" : this.validateFormPagoTarjeta.value.ano_expiracion,
            "cvv" : this.validateFormPagoTarjeta.value.cvv,
            "email" : this.validateFormPagoTarjeta.value.email,
            "nombre_titular" : this.validateFormPagoTarjeta.value.nombre_titular,
            "rut_titular" : this.validateFormPagoTarjeta.value.rut_titular,
          }
  
          console.log('carteraPagos', carteraPagos);
  
          this.clienteService.crearCarteraPagos(carteraPagos).subscribe(resp2=>{
            console.log('resp', resp2);
  
            const transaccion = {
              "rut_cliente" : this.clienteObjectParam.rut_cliente,
              "id_boleta" : this.boletaAIngresar.id_boleta,
              "valor" : this.boletaAIngresar.total,
              "id_cartera_pagos" : resp2,
            }
  
            this.clienteService.crearTransaccion(transaccion).subscribe(resp3 =>{
              console.log('resp', resp3);
            })
          })

          this.visiblePedirCuenta = false;
          this.mostrarDetalleBoletaFinal();
          // this.cancelarReserva();
          // window.location.reload();
        })
      }
      else{
        this.nzNotificacionService.create(
          'warning', 'Tarjeta inválida', 'Revise e ingrese los datos correctamente'
        );
      }
    }
    else if(this.boletaAIngresar.idTipoPago == 1){
      console.log('boletaAIngresar', this.boletaAIngresar);
      this.boletaAIngresar.idEstadoBoleta = 4
      //PAGA EN EFECTIVO, FALTA PARTE DEL PROCESO DE PAGO EN CAJA
        const boleta = {
          "boleta": this.boletaAIngresar
        }
        this.clienteService.modificarBoleta(boleta).subscribe(resp =>{
          console.log('resp modificarBoleta', resp);
          this.visiblePedirCuenta = false;
          this.mostrarDetalleBoletaFinal();
          // this.cancelarReserva();
          // window.location.reload();
        })
    }
  }

  crearPedidoAIngresar(){
    let subtotal : number = 0;
    this.now = new Date();

    this.carritoDeCompras.forEach(p => {
      // console.log('cantidad', p.cantidad);
      // console.log('valor', p.valorUnitario);
      let valorPorCantidad = p.cantidad * p.valorUnitario;
      // console.log('valorPorCantidad',valorPorCantidad);
      subtotal += valorPorCantidad;
    });
    console.log('subtotal', subtotal);
    this.pedidoAIngresar = {
      carritoProductos : this.carritoDeCompras,
      fechaIngreso: this.now.toLocaleDateString()+' '+ this.now.toLocaleTimeString(),
      idEstadoIinstancia : 1,
      idMesa: this.mesaObjectParam.id_mesa,
      rutCliente : this.clienteObjectParam.rut_cliente,
      subtotal : subtotal
    }
    console.log('pedidoAIngresar', this.pedidoAIngresar);
  }

  instanciarBoletaYPedido(){
    console.log('instanciarBoletaYPedido');
    let subtotalSumPedidos :number = 0;
    this.pedidoEnBoleta.forEach( p => {
      subtotalSumPedidos += p.subtotal;
    });
    console.log('subtotalSumPedidos',subtotalSumPedidos);

    if (this.boletaAIngresar != null){
      this.boletaAIngresar.subtotal = subtotalSumPedidos;
      console.log('boletaAIngresar', this.boletaAIngresar);
      //AQUI IRÁ UN SERVICIO QUE MODIFICAR LA BOLETA EXISTENTE Y SIRVE PARA ACTUALIZAR SU SUBTOTAL
    }
    else{
      this.boletaAIngresar  = {
        fechaAtencion : this.now.toLocaleDateString(),
        horaAtencion : this.now.toLocaleTimeString(),
        idUsuario : 'admin',
        rutCliente : this.clienteObjectParam.rut_cliente,
        subtotal : subtotalSumPedidos
      }
      console.log('boletaAIngresar', this.boletaAIngresar);
    }

    const instanciarBoleta : InstanciarBoleta ={
      boleta : this.boletaAIngresar
    }

    this.clienteService.instanciarBoleta(instanciarBoleta).subscribe(resp=>{
      console.log('resp instanciarBoleta', resp);
      const id_boleta = resp
      this.boletaAIngresar.id_boleta = parseInt(resp);
      this.pedidoAIngresar.idBoleta = parseInt(resp);
      // console.log('boletaAIngresar', this.boletaAIngresar);
      // console.log('pedidoAIngresar', this.pedidoAIngresar);
      const instanciarPedido : InstanciarPedido ={
        pedido : this.pedidoAIngresar
      }
      // console.log('instanciarPedido', instanciarPedido);

      this.clienteService.instanciarPedido(instanciarPedido).subscribe(resp=>{
        console.log('resp instanciarPedido', resp);
        this.pedidoAIngresar.idPedido = parseInt(resp);
        this.pedidoEnBoleta.push(this.pedidoAIngresar);

        //limpiar pedidoAIngresar
        this.pedidoAIngresar = null;
        //limpiar carritoDeCompras
        this.carritoDeCompras = [];
        // console.log('pedidoAIngresar', this.pedidoAIngresar);
        // console.log('pedidoEnBoleta', this.pedidoEnBoleta);

        this.obtenerPedidosPorIdBoleta(id_boleta);
      })
      
    })
  }

  cerrarDrawerPedirCuenta(){
    this.visiblePedirCuenta = false;
  }

  pedirCuenta(){
    console.log('pedirCuenta');
    this.visiblePedirCuenta = true;
    this.visibleBoleta = false;
    this.boletaAIngresar.total = this.boletaAIngresar.subtotal
    this.onChangePropina();

    this.validateFormPagoTarjeta = new FormGroup({
      nombre_titular : new FormControl,
      email : new FormControl,
      rut_titular : new FormControl,
      numero_tarjeta : new FormControl,
      mes_expiracion : new FormControl,
      ano_expiracion : new FormControl,
      cvv : new FormControl
    })

    this.validateFormPagoTarjeta = this.fb.group({
      nombre_titular : [null, [Validators.required]],
      email : [null, [Validators.required, Validators.email]],
      rut_titular : [null, [Validators.required]],
      numero_tarjeta : [null, [Validators.required, Validators.minLength(16)]],
      mes_expiracion : [null, [Validators.required]],
      ano_expiracion : [null, [Validators.required]],
      cvv : [null, [Validators.required, Validators.minLength(3)]]
    })
  }

  onChangePropina(){
    if (this.propinaEnBoletaAPagar){
      this.boletaAIngresar.extras = (this.boletaAIngresar.subtotal * 0.1);
      this.boletaAIngresar.total = this.boletaAIngresar.subtotal + this.boletaAIngresar.extras
    }
    else{
      this.boletaAIngresar.extras = -1;
      this.boletaAIngresar.total = this.boletaAIngresar.subtotal
    }
  }

  mostrarDetalleBoletaFinal(){
    if (this.formaDePago == '1'){
      this.dirigirseACaja = true;
    }
    else if (this.formaDePago == '2' || this.formaDePago == '3'){
      this.resumenPago = true;
    }
    setTimeout(() => {
      this.resumenPago = false;
      this.dirigirseACaja = false;
      this.terminarEstancia();
    }, 10000);
  }

  onChangeRecetaSelected(ev,id_plato){
    // console.log('onChangeRecetaSelected', ev);
    document.getElementById(id_plato).setAttribute('ngmodel', ev)
    // console.log('dom', document.getElementById(id_plato));
  }

}
