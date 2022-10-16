import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router} from '@angular/router';
import { Pedido, ProductoEnCarro } from 'src/app/interfaces/carrito-compras';
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
    private router: Router
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
  mesaReservada :boolean = false;
  listaPlatos;
  listaProductos;
  carritoDeCompras : ProductoEnCarro[] = [];
  visibleDetallePlato = false;
  visibleCarritoCompras = false;
  platoSelected : Plato;
  productoSelected : Producto;
  cantidadProductoAgregarAlCarro = 1;
  pedidoAIngresar : Pedido;
  now : Date;

  ngOnInit() {
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
        id_estado_mesa : estadoMesa,
        id_mesa : Object(resp).id_mesa,
        id_tipo_mesa : tipoMesa
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
      }
      else{
        console.log('Esta mesa está disponible y no tiene una reserva activa');
        this.mesaReservada = false;
      }
    })
  }

  obtenerPlatos(){
    this.clienteService.obtenerPlatos().subscribe(resp=>{
      this.listaPlatos = resp['plato'];
      console.log('listaPlatos', this.listaPlatos);
      
    });
  }

  obtenerProductos(){
    this.clienteService.obtenerProductos().subscribe(resp=>{
      this.listaProductos = resp['productos'];
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
        window.location.reload();
      }
      
    })
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
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

  verCarrito(){
    console.log('carritoDeCompras', this.carritoDeCompras);
    if (this.carritoDeCompras.length > 0){
      this.visibleCarritoCompras = true;
    }
    else{
      alert('No hay productos en el carro')
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
      const productoEnCarro : ProductoEnCarro = {
      plato: plato,
      cantidad : 1,
      esPlato : true,
      esProducto : false,
      valorUnitario : plato.precio_plato
      }
      this.carritoDeCompras.push(productoEnCarro);
    }
    else{
      // console.log('existe, sumar 1');
      this.carritoDeCompras.find(p => {
        if (p.plato != null && p.plato != undefined){
          if (p.plato.id_plato === plato.id_plato){
            p.cantidad +=1
          }
        }
      })
    }
    console.log('carritoDeCompras', this.carritoDeCompras);
    this.crearPedidoAIngresar();
  }

  quitarPlatoDelCarro(plato){
    console.log('eliminar plato', plato);
    this.carritoDeCompras.findIndex(p => {
      if (p.plato.id_plato === plato.id_plato){
        if (p.cantidad > 0){
          p.cantidad -= 1;
        }
      }
    })
    console.log('carritoDeCompras', this.carritoDeCompras);
    this.crearPedidoAIngresar();
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
  }

  quitarProductoDelCarro(producto){
    console.log('eliminar producto', producto);
    this.carritoDeCompras.findIndex(p => {
      if (p.producto.id_producto === producto.id_producto){
        if (p.cantidad > 0){
          p.cantidad -= 1;
        }
      }
    })
    console.log('carritoDeCompras', this.carritoDeCompras);
    this.crearPedidoAIngresar();
  }

  confirmarPedido(){
    console.log('confirmarPedido');
    console.log('pedidoAIngresar', this.pedidoAIngresar);
    console.log('carritoDeCompras', this.carritoDeCompras);
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
}
