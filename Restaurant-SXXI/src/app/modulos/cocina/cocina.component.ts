import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Plato, PlatoId, Receta, tipo_plato } from 'src/app/interfaces/cocina';
import { CocinaService } from './cocina.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {
  
  validateFormCrearPlato!: FormGroup;
  validateFormEliminarPlato!: FormGroup;

  constructor(
    private router: Router, 
    private cocinaService : CocinaService,
    private fb: FormBuilder,
    private notification: NzNotificationService
    ) { }

  ngOnInit() {
    this.obtenerPlatos();
    this.obtenerTipo_Plato();
    this.validateFormCrearPlato = new FormGroup({
      id_plato : new FormControl,
      cantidad_personas_recomendadas: new FormControl,
      comentario : new FormControl,
      descripcion_plato: new FormControl,
      disponibilidad: new FormControl,
      nombre_plato: new FormControl,
      precio_plato: new FormControl,
      id_tipo_plato: new FormControl,
      eliminado: new FormControl
    })
    this.validateFormEliminarPlato = new FormGroup({
      id_plato : new FormControl
    })
  }

  title = 'Restaurant-SXXI';
  listaPlatos : Plato[] = [];
  listaReceta : Receta[] = [];
  listaTipoPlato: tipo_plato[] = [];
  isVisibleCrearPlato = false;
  existenRecetas = false;
  isVisibleListadoReceta = false;
  isVisibleEliminarPlato = false;

  obtenerPlatos(){
    this.listaPlatos = [];
    this.cocinaService.obtenerPlatos().subscribe(resp => {
      // console.log('resp', resp);
      for (let unPlato of resp["plato"]){
        // console.log('unPlato', unPlato);
        const plato : Plato = {
          id_plato : unPlato.id_plato,
          id_tipo_plato : unPlato.id_tipo_plato,
          nombre_plato : unPlato.nombre_plato,
          precio_plato : unPlato.precio_plato,
          cantidad_personas_recomendadas : unPlato.cantidad_personas_recomendadas,
          descripcion_plato : unPlato.descripcion_plato,
          comentario : unPlato.comentario,
          disponibilidad : unPlato.disponibilidad,
          eliminado : unPlato.eliminado
        }
        // console.log('plato', plato);
        this.listaPlatos.push(plato);
        console.log('listaPlatos', this.listaPlatos);
        this.listaPlatos.sort(function(a,b){
          if(a.id_plato < b.id_plato){
            return -1
          }
          if (a.id_plato > b.id_plato){
            return 1
          }
          return 0;
        })
      }

    })
  }

  // obtenerReceta(){
  //   this.isVisibleListadoReceta = true;
  //   this.listaReceta = []
  //   this.cocinaService.obtenerRecetas().subscribe((resp) =>{
  //     if (Object.keys(resp).length > 0){
  //       // console.log('resp',resp);
  //       for (let Receta of resp["recetas"]){
  //         // console.log('user', user);
  //         const c_receta :Receta= {
  //           id_receta: Receta.id_receta,
  //           comentario: Receta.comentario,
  //           complejidad: Receta.complejidad,
  //           tiempo_preparacion: Receta.tiempo_preparacion
  //         }
  //         this.listaReceta.push(c_receta);
  //       }
  //       this.existenRecetas = true;
  //       console.log('listaReceta', this.listaReceta);        
  //     }
  //   });
  // }

///////////
  
  crearPlato(){
      this.isVisibleCrearPlato = true; //para abrir la ventana emergente, luego hay que cerrarla en otra funcion
      this.validateFormCrearPlato = this.fb.group({
        id_plato : [null, [Validators.required]],
        cantidad_personas_recomendadas: [null, [Validators.required]],
        comentario: [null, [Validators.required]],
        descripcion_plato: [null, [Validators.required]],
        disponibilidad: [null, [Validators.required]],
        nombre_plato: [null, [Validators.required]],
        precio_plato: [null, [Validators.required]],
        id_tipo_plato: [null, [Validators.required]],
        eliminado: [false, [Validators.required]]
      })

    console.log('Crear Plato');
  }

  guardarCrearPlato(){
    console.log('Servicio crear plato');
    this.enviarFormularioCrearPlato();
    var valores = this.validateFormCrearPlato.value

    if (this.validateFormCrearPlato.valid){
      var platoACrear : Plato = {
        id_plato : valores.id_plato,
        cantidad_personas_recomendadas: valores.cantidad_personas_recomendadas,
        comentario: valores.comentario,
        descripcion_plato: valores.descripcion_plato,
        disponibilidad: valores.disponibilidad,
        nombre_plato: valores.nombre_plato,
        precio_plato: valores.precio_plato,
        id_tipo_plato: valores.id_tipo_plato,
        eliminado: valores.eliminado
      }

      console.log('platoACrear: ', platoACrear);
      this.cocinaService.crearPlato(platoACrear).subscribe(resp=>{
        console.log('resp:', resp);
        this.cerrarCrearPlato();
        this.notification.create(
          'success', 'Plato creado', resp
        );
      },
      error => {
        // console.log('error', error); 
        this.notification.create(
          'error', 'Error al crear plato', 'No es posible crear el plato, lo sentimos'
        )
      });
    }
  }

  enviarFormularioCrearPlato(){
    if (this.validateFormCrearPlato.valid){
      console.log('Formulario válido', this.validateFormCrearPlato.value);      

    } else {
      console.log('Formulario no válido?', this.validateFormCrearPlato.value);

      this.notification.create(
        'error', 'Error al crear plato', 'Debes rellenar todos los campos'
      )

      Object.values(this.validateFormCrearPlato.controls).forEach(control => {
        // console.log('control', control);
        if (control.invalid) {
          console.log('control inválido');          
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf : true});
        }
      });
    }
  }

  cerrarCrearPlato(){
    this.isVisibleCrearPlato = false;
    this.validateFormCrearPlato.reset();
  }

///////////

  crearReceta(){
    console.log('crearReceta');
  }

  verPlatos(){
    console.log('verPlatos');
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
  }

/////////////

obtenerTipo_Plato(){
  this.listaTipoPlato = []
  this.cocinaService.obtenerTipoPlato().subscribe(resp => {
    // console.log("resp",resp);
    let listaTipoPlato = resp["list_tipoplato"]
    for (let tipo_plato of listaTipoPlato){
      const unTipoPlato : tipo_plato = {
        id_tipo_plato: tipo_plato.id_tipo_plato,
        descripcion_tipo_plato: tipo_plato.descripcion_tipo_plato,
        nombre_tipo_plato: tipo_plato.nombre_tipo_plato
      }
      this.listaTipoPlato.push(unTipoPlato);
    }
    console.log('listaTipoPlato', this.listaTipoPlato);
    
  })
}


//////////////////////

eliminarPlato(){
  this.isVisibleEliminarPlato = true; //para abrir la ventana emergente, luego hay que cerrarla en otra funcion
      this.validateFormEliminarPlato = this.fb.group({
        id_plato : [null, [Validators.required]]
      })

    console.log('Eliminar Plato');
}

cerrarEliminarPlato(){
  this.isVisibleEliminarPlato = false;
}

guardarEliminarPlato(){
  console.log('validateFormEliminarPlato', this.validateFormEliminarPlato.value);
    if (this.validateFormEliminarPlato.valid){
      console.log('Formulario válido');
      var valores = this.validateFormEliminarPlato.value;

      var platoAEliminar : PlatoId = {
        id_plato : valores.id_plato
      }
      // Validación mesa reservada: obtener reserva activa por Id_mesa
      this.cocinaService.eliminarPlato(platoAEliminar).subscribe(resp =>{
        console.log('resp', resp);
        if (resp.includes('No se puede eliminar este plato')){
          this.notification.create(
            'error', 'Error al eliminar plato', resp
          )
        }
        else if (resp.includes('Se eliminó el plato correctamente')){
          this.notification.create(
            'success', 'Plato eliminado', resp
          )
          this.obtenerPlatos();
          this.isVisibleEliminarPlato = false;
        }
      });
    }
    else{
      console.log('Formulario no válido', this.validateFormEliminarPlato.value);

      this.notification.create(
        'error', 'Error al eliminar el plato', 'Debes rellenar todos los campos'
      )
    }
}


}
