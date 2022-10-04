import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MesasService } from './mesas.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  constructor(private mesasService : MesasService, private fb: FormBuilder) { }

  listadoMesas: any;
  isVisibleCrearMesa = false;
  validateFormCrearMesa: FormGroup;
  selectIdEstadoMesa;
  selectIdTipoMesa;

  ngOnInit() {
    this.obtenerMesas();

    this.validateFormCrearMesa = new FormGroup({
      id_mesa : new FormControl,
      id_estado_mesa: new FormControl,
      id_tipo_mesa: new FormControl
    })
  }

  obtenerMesas(){
    this.mesasService.obtenerMesas().subscribe(resp => {
      console.log('resp', resp);
      this.listadoMesas = resp["listado_mesas"];
    })
  }

  cerrarCrearMesa(){

  }

  guardarCrearMesa(){

  }

  enviarFormularioCrearMesa(){

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
