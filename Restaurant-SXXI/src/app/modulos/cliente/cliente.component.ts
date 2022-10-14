import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, ActivatedRoute, Router} from '@angular/router';
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
  visibleMenu = false;
  listaPlatos;
  carritoDeCompras = [];
  visibleDetallePlato = false;

  ngOnInit() {
    this.mesaReservada = false;
    const id_mesa = {
      id_mesa : this.idMesaParam
    }
    this.obtenerUnaMesa(id_mesa);
    this.obtenerReservaActivaPorIdMesa(id_mesa);
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

  verMenu(){
    console.log('aquí se mostrará el menú');
    this.mostrarDrawerMenu();
  }

  mostrarDrawerMenu(): void {
    this.visibleMenu = true;
    this.clienteService.obtenerPlatos().subscribe(resp=>{
      this.listaPlatos = resp['plato'];
      console.log('listaPlatos', this.listaPlatos);
      
    });
  }

  cerrarDrawerMenu(): void {
    this.visibleMenu = false;
    this.visibleDetallePlato = false;
  }

  cancelarReserva(){
    console.log('aquí se cancelará la reserva');
    const cancelarReserva : CancelarReserva = {
      id_reserva : this.reservaObjectParam.id_reserva.toString()
    }

    this.clienteService.cancelarReserva(cancelarReserva).subscribe(resp =>{
      console.log('resp cancelarReserva', resp);
      
    })
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
  }

  verDetallePlato(idPlato){
    this.visibleDetallePlato = true;
  }

  seleccionarPlato(idPlato){
    console.log('idPlato', idPlato);
  }

  cerrarDrawerDetallePlato(){
    this.visibleDetallePlato = false;
  }
}
