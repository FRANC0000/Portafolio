import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MesasService } from './mesas.service';
import { Cliente, EstadoMesa, Mesa, Reserva, TipoMesa } from 'src/app/interfaces/mesa';
import { NzNotificationService } from 'ng-zorro-antd';
import { ThrowStmt } from '@angular/compiler';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit, OnDestroy{

  constructor(private mesasService : MesasService, private fb: FormBuilder, private notification: NzNotificationService) { }

  listadoMesas: any;
  listadoEstadosMesas: EstadoMesa [] = [];
  listadoTiposMesas: TipoMesa [] = [];
  isVisibleCrearMesa = false;
  isVisibleIngresarReserva = false;
  validateFormCrearMesa: FormGroup;
  validateFormCrearCliente: FormGroup;
  validateFormCrearReserva: FormGroup;
  selectIdEstadoMesa;
  selectIdTipoMesa;
  estadoMesaSeleccionado = '';
  tipoMesaSeleccionado = '';
  mesaSeleccionada : Mesa;
  rutSeleccionado = '';
  dvSeleccionado = '';
  now : Date;
  sub :Subscription;

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  subsActualizarMesas(){
    this.sub = this.mesasService.refresh$.subscribe(() => {
      this.obtenerMesas();
    })
  }

  ngOnInit() {
    this.obtenerMesas();
    this.obtenerEstadosMesas();
    this.obtenerTiposMesas();
    this.validateFormCrearMesa = new FormGroup({
      id_mesa : new FormControl,
      id_estado_mesa: new FormControl,
      id_tipo_mesa: new FormControl
    })

    this.validateFormCrearCliente = new FormGroup({
      rut_cliente : new FormControl,
      dv_cliente : new FormControl,
      nombre_cliente: new FormControl
    })

    this.validateFormCrearReserva = this.fb.group({
      id_reserva: new FormControl,
      id_mesa: new FormControl,
      rut_cliente: new FormControl,
      dv_cliente: new FormControl,
      cant_consumidores: new FormControl,
      fecha_reserva: new FormControl,
      hora_reserva: new FormControl,
      comentario: new FormControl,
      id_estado_reserva: new FormControl
    })
  }

  obtenerMesas(){
    this.mesasService.obtenerMesas().subscribe(resp => {
      this.listadoMesas = resp["listado_mesas"];
      console.log('listadoMesas', this.listadoMesas);
    })
  }

  obtenerEstadosMesas(){
    this.mesasService.obtenerEstadosMesas().subscribe(resp => {
      let listadoEM = resp['listEstadoMesa'];
      for (let eM of listadoEM){
        const estadoMesa : EstadoMesa ={
          id_estado_mesa : eM.id_estado_mesa,
          nombre_estado_mesa: eM.nombre_estado_mesa
        }
        this.listadoEstadosMesas.push(estadoMesa)
      }
      console.log('listadoEstadosMesas', this.listadoEstadosMesas);
    })
  }

  obtenerTiposMesas(){
    this.mesasService.obtenerTipoMesas().subscribe(resp => {
      let listadoTM = resp['tipoMesa'];
      for (let tM of listadoTM){
        const tipoMesa : TipoMesa ={
          id_tipo_mesa : tM.id_tipo_mesa,
          nombre_tipo_mesa: tM.nombre_tipo_mesa,
          cantidad_asientos: tM.cantidad_asientos

        }
        this.listadoTiposMesas.push(tipoMesa)
      }
      console.log('listadoTiposMesas', this.listadoTiposMesas);
    })
  }
  
  cerrarCrearMesa(){
    this.isVisibleCrearMesa = false;
  }

  guardarCrearMesa(){
    // this.isVisibleCrearMesa = false;
    console.log('validateFormCrearMesa', this.validateFormCrearMesa.value);
    if (this.validateFormCrearMesa.valid){
      console.log('Formulario válido');
      var valores = this.validateFormCrearMesa.value;

      var tM = this.listadoTiposMesas.find(i => i.id_tipo_mesa === parseInt(this.tipoMesaSeleccionado));

      var tipoMesaCrear: TipoMesa = {
        id_tipo_mesa: tM.id_tipo_mesa,
        cantidad_asientos: tM.cantidad_asientos,
        nombre_tipo_mesa : tM.nombre_tipo_mesa
      }

      var eM = this.listadoEstadosMesas.find(i => i.id_estado_mesa === parseInt(this.estadoMesaSeleccionado));

      var estadoMesaCrear: EstadoMesa = {
        id_estado_mesa : eM.id_estado_mesa,
        nombre_estado_mesa : eM.nombre_estado_mesa
      }

      var mesaACrear : Mesa = {
        id_mesa : valores.id_mesa,
        id_tipo_mesa: tipoMesaCrear,
        id_estado_mesa: estadoMesaCrear
      }

      this.mesasService.crearMesa(mesaACrear).subscribe(resp =>{
        console.log('resp', resp);
        if (resp.includes('No se puede crear esta mesa')){
          this.notification.create(
            'error', 'Error al crear mesa', resp
          )
        }
        else if (resp.includes('creada satisfactoriamente')){
          this.notification.create(
            'success', 'Mesa creada', resp
          )
          this.obtenerMesas();
          this.isVisibleCrearMesa = false;
        }
      });
    }
    else{
      console.log('Formulario no válido', this.validateFormCrearMesa.value);

      this.notification.create(
        'error', 'Error al crear mesa', 'Debes rellenar todos los campos'
      )
    }
    
    
  }

  crearMesa(){
    this.isVisibleCrearMesa = true;
    this.validateFormCrearMesa = this.fb.group({
      id_mesa : [null, [Validators.required]],
      id_estado_mesa: [null, [Validators.required]],
      id_tipo_mesa: [null, [Validators.required]],
    })
  }

  obtenerMesaSeleccionada(mesa : Mesa){
    this.mesaSeleccionada = mesa;
    return this.mesaSeleccionada;
  }

  clickMesa(mesa :Mesa){
    this.obtenerMesaSeleccionada(mesa);

    this.now = new Date();

    this.validateFormCrearCliente = this.fb.group({
      rut_cliente : [null, [Validators.required]],
      dv_cliente : [null, [Validators.required]],
      nombre_cliente : [null, [Validators.required]]
    })

    this.validateFormCrearReserva = this.fb.group({
      id_reserva: [1, [Validators.required]],
      id_mesa: [this.mesaSeleccionada.id_mesa, [Validators.required]],
      rut_cliente: [null, [Validators.required]],
      dv_cliente: [null, [Validators.required]],
      cant_consumidores: [null, [Validators.required]],
      fecha_reserva: [this.now.toLocaleDateString(), [Validators.required]],
      hora_reserva: [this.now.toLocaleTimeString(), [Validators.required]],
      comentario: [null],
      id_estado_reserva: ['En cola', [Validators.required]],
    })

    this.isVisibleIngresarReserva = true;
  }

  onChangeRut(){
    this.rutSeleccionado = this.validateFormCrearCliente.value.rut_cliente;
    this.dvSeleccionado = this.validateFormCrearCliente.value.dv_cliente;
    // console.log('rutSeleccionado', this.rutSeleccionado);
    // console.log('dvSeleccionado', this.dvSeleccionado);
    
  }

  enviarIngresoReserva(){
    const ingresarCliente = this.ingresarCliente();
    const ingresarReserva = this.ingresarReserva();
    // console.log('FormCliente', ingresarCliente);
    // console.log('FormReserva', ingresarReserva);

    if (ingresarCliente.valid && ingresarReserva.valid){
      // Aqui va servicio de ingresar reserva e ingresar cliente y se envía ingresarReserva && ingresarCliente'
      const clienteAIngresar :Cliente ={
        rut_cliente : ingresarCliente.value.rut_cliente,
        dv_cliente : ingresarCliente.value.dv_cliente,
        nombre_cliente : ingresarCliente.value.nombre_cliente,
      }
      const reservaAIngresar : Reserva = {
        id_reserva : ingresarReserva.value.id_reserva,
        id_estado_reserva : 1,
        id_mesa : ingresarReserva.value.id_mesa,
        rut_cliente: ingresarReserva.value.rut_cliente  ,
        dv_cliente: ingresarReserva.value.dv_cliente,
        cant_consumidores: ingresarReserva.value.cant_consumidores,
        fecha_reserva : ingresarReserva.value.fecha_reserva,
        hora_reserva : ingresarReserva.value.hora_reserva,
        comentario : ingresarReserva.value.comentario
      }
      console.log('clienteAIngresar', clienteAIngresar);
      console.log('reservaAIngresar', reservaAIngresar);
            
    }
    else{
      console.log('Ingreso de reserva erróneo');

      this.notification.create(
        'error', 'Error al ingresar reserva', 'Debes rellenar correctamente todos los campos'
      )

      Object.values(this.validateFormCrearCliente.controls).forEach(control => {
        if (control.invalid) {
          console.log('control inválido');          
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf : true});
        }
      });
      Object.values(this.validateFormCrearReserva.controls).forEach(control => {
        if (control.invalid) {
          console.log('control inválido');          
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf : true});
        }
      });
    }
  }

  cerrarIngresarReserva(){
    this.isVisibleIngresarReserva = false;
    this.mesaSeleccionada = null;
  }

  ingresarCliente(){
    return this.validateFormCrearCliente
  } 

  ingresarReserva(){
    return this.validateFormCrearReserva
  }
}
