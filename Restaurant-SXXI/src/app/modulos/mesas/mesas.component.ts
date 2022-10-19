import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MesasService } from './mesas.service';
import { CancelarReserva, Cliente, EstadoMesa, IngresarReserva, Mesa, Reserva, TipoMesa } from 'src/app/interfaces/mesa';
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

  listadoMesas: Mesa[] = [];
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
  idReservaRealizada :number = 0;
  mostrarReservaRealizada : boolean = false;
  now : Date;
  sub :Subscription;
  isVisibleEliminarMesa = false;
  isVisibleActualizarMesa = false;
  validateFormEliminarMesa: FormGroup;
  validateFormActualizarMesa : FormGroup;

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

    this.validateFormEliminarMesa = new FormGroup({
      id_mesa : new FormControl
    })

    this.validateFormActualizarMesa = new FormGroup({
      id_mesa : new FormControl,
      id_estado_mesa: new FormControl,
      id_tipo_mesa: new FormControl,
      eliminado : new FormControl
    })

  }

  obtenerMesas(){
    this.mesasService.obtenerMesas().subscribe(resp => {
      this.listadoMesas = resp["listado_mesas"];
      console.log('listadoMesas', this.listadoMesas);
      this.listadoMesas.sort(function(a,b){
        if(a.id_mesa < b.id_mesa){
          return -1
        }
        if (a.id_mesa > b.id_mesa){
          return 1
        }
        return 0;
      })
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

      if (ingresarReserva.value.comentario == null){
        ingresarReserva.value.comentario = "";
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

      const ingresarReservaObj : IngresarReserva = {
        clienteAIngresar: clienteAIngresar,
        reservaAIngresar: reservaAIngresar
      }

      console.log('Servicio ingresarReserva');
      this.mesasService.ingresarReserva(ingresarReservaObj).subscribe(resp =>{
        console.log('resp', resp);
        if (resp.includes('creada satisfactoriamente')){
          this.isVisibleIngresarReserva = false;
          let respString :string;
          respString = resp;
          let idReserva = respString.match(/(\d+)/);
          console.log('idReserva', idReserva[0]);
          this.idReservaRealizada = parseInt(idReserva[0]);
          this.mostrarReservaRealizada = true;
          setTimeout(() => {
            this.mostrarReservaRealizada = false;
          }, 10000);
          this.obtenerMesas();
        }
      })
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

  cancelarReserva(){
    console.log('Aquí irá el proceso de cancelar pedido');
    this.idReservaRealizada;

    const cancelarReserva : CancelarReserva = {
      id_reserva : this.idReservaRealizada.toString()
    }

    this.mesasService.cancelarReserva(cancelarReserva).subscribe(resp => {
      console.log('resp', resp);
      if (resp.includes('cancelada con éxito')){
        this.notification.create(
          'success', 'Reserva cancelada', resp
        )
        this.obtenerMesas();
        this.idReservaRealizada = null;
        this.mesaSeleccionada = null;
        this.mostrarReservaRealizada = false;
      }
    })
    
  }

  eliminarMesa(){
    this.isVisibleEliminarMesa = true;
    this.validateFormEliminarMesa = this.fb.group({
      id_mesa : [null, [Validators.required]],
    })
  }

  actualizarMesa(){
    this.isVisibleActualizarMesa = true;
    this.validateFormActualizarMesa = this.fb.group({
      id_mesa : [null, [Validators.required]],
      id_estado_mesa: [null, [Validators.required]],
      id_tipo_mesa: [null, [Validators.required]],
      eliminado: [null, [Validators.required]]
    })
  }

  guardarEliminarMesa(){
    // this.isVisibleEliminarMesa = false;
    console.log('validateFormEliminarMesa', this.validateFormEliminarMesa.value);
    if (this.validateFormEliminarMesa.valid){
      console.log('Formulario válido');
      var valores = this.validateFormEliminarMesa.value;

      var mesaAEliminar = {
        id_mesa : valores.id_mesa
      }
      // Validación mesa reservada: obtener reserva activa por Id_mesa
      this.mesasService.eliminarMesa(mesaAEliminar).subscribe(resp =>{
        console.log('resp', resp);
        if (resp.includes('No se puede eliminar esta mesa')){
          this.notification.create(
            'error', 'Error al eliminar mesa', resp
          )
        }
        else if (resp.includes('Se eliminó la mesa correctamente')){
          this.notification.create(
            'success', 'Mesa eliminada', resp
          )
          this.obtenerMesas();
          this.isVisibleEliminarMesa = false;
        }
      });
    }
    else{
      console.log('Formulario no válido', this.validateFormEliminarMesa.value);

      this.notification.create(
        'error', 'Error al eliminar mesa', 'Debes rellenar todos los campos'
      )
    }
  }

  cerrarEliminarMesa(){
    this.isVisibleEliminarMesa = false;
  }

  guardarActualizarMesa(){
    console.log('validateFormActualizarMesa', this.validateFormActualizarMesa.value);
    if (this.validateFormActualizarMesa.valid){
      console.log('Formulario válido');
      var valores = this.validateFormActualizarMesa.value;

      var tM = this.listadoTiposMesas.find(i => i.id_tipo_mesa === parseInt(this.tipoMesaSeleccionado));

      var tipoMesaActualizar: TipoMesa = {
        id_tipo_mesa: tM.id_tipo_mesa,
        cantidad_asientos: tM.cantidad_asientos,
        nombre_tipo_mesa : tM.nombre_tipo_mesa
      }

      var eM = this.listadoEstadosMesas.find(i => i.id_estado_mesa === parseInt(this.estadoMesaSeleccionado));

      var estadoMesaActualizar: EstadoMesa = {
        id_estado_mesa : eM.id_estado_mesa,
        nombre_estado_mesa : eM.nombre_estado_mesa
      }

      var mesaAActualizar : Mesa = {
        id_mesa : valores.id_mesa,
        id_tipo_mesa: tipoMesaActualizar,
        id_estado_mesa: estadoMesaActualizar,
        eliminado : valores.eliminado
      }

      this.mesasService.actualizarMesa(mesaAActualizar).subscribe(resp =>{
        console.log('resp', resp);
        if (resp.includes('No existe mesa asociada a este ID')){
          this.notification.create(
            'error', 'Error al actualizar mesa', resp
          )
        }
        else if (resp.includes('actualizada satisfactoriamente')){
          this.notification.create(
            'success', 'Mesa actualizada', resp
          )
          this.obtenerMesas();
          this.isVisibleActualizarMesa = false;
        }
      });
    }
    else{
      console.log('Formulario no válido', this.validateFormActualizarMesa.value);
      
      this.notification.create(
        'error', 'Error al actualizar mesa', 'Debes rellenar todos los campos'
      )
    }
  }

  cerrarActualizarMesa(){
    this.isVisibleActualizarMesa = false;
  }
}
