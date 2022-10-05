import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MesasService } from './mesas.service';
import { EstadoMesa, Mesa, TipoMesa } from 'src/app/interfaces/mesa';
import { isInteger, NzNotificationService } from 'ng-zorro-antd';
import { stringify } from 'querystring';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  constructor(private mesasService : MesasService, private fb: FormBuilder, private notification: NzNotificationService) { }

  listadoMesas: any;
  listadoEstadosMesas: EstadoMesa [] = [];
  listadoTiposMesas: TipoMesa [] = [];
  isVisibleCrearMesa = false;
  validateFormCrearMesa: FormGroup;
  selectIdEstadoMesa;
  selectIdTipoMesa;
  estadoMesaSeleccionado = '';
  tipoMesaSeleccionado = '';

  ngOnInit() {
    this.obtenerMesas();
    this.obtenerEstadosMesas();
    this.obtenerTiposMesas();
    this.validateFormCrearMesa = new FormGroup({
      id_mesa : new FormControl,
      id_estado_mesa: new FormControl,
      id_tipo_mesa: new FormControl
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

}
