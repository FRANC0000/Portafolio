import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { EstadoMesa, Mesa, TipoMesa } from 'src/app/interfaces/mesa';
import { rol, user } from 'src/app/interfaces/user';
import { AdministadorService } from './administador.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  constructor(
    private administadorService : AdministadorService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  title = 'Restaurant-SXXI';
  listUsuarios : user[] = [];
  existenUsuarios = false;
  isVisibleCrearUsuario = false;
  isVisibleListadoUsuarios = false;
  rolSelected = '';
  listRoles: rol[] = [];
  isVisibleModificarUsuario = false;
  validateFormEliminarUsuario: FormGroup;
  validateFormModificarUsuario: FormGroup;
  isVisibleEliminarUsuario = false;
  isVisibleCrearMesa = false;
  validateFormCrearMesa: FormGroup;
  listadoTiposMesas: TipoMesa [] = [];
  tipoMesaSeleccionado = '';
  listadoEstadosMesas: EstadoMesa [] = [];
  estadoMesaSeleccionado = '';
  listadoMesas: Mesa[] = [];
  validateFormCrearUsuario!: FormGroup;
  isVisibleListadoMesas = false;
  mesaSelected;
  usuarioSelected;
  isVisibleActualizarMesa = false;
  validateFormActualizarMesa : FormGroup;

  ngOnInit() {
    this.obtenerRoles();
    this.obtenerMesas();
    this.obtenerEstadosMesas();
    this.obtenerTiposMesas();
    this.validateFormCrearUsuario = new FormGroup({
      id_usuario : new FormControl,
      rut_usuario: new FormControl,
      dv_usuario : new FormControl,
      nombre: new FormControl,
      apellido_paterno: new FormControl,
      apellido_materno: new FormControl,
      rol: new FormControl,
      correo: new FormControl,
      contrasena: new FormControl,
    })

    this.validateFormModificarUsuario = new FormGroup({
      id_usuario : new FormControl,
      rut_usuario: new FormControl,
      dv_usuario : new FormControl,
      nombre: new FormControl,
      apellido_paterno: new FormControl,
      apellido_materno: new FormControl,
      rol: new FormControl,
      correo: new FormControl,
      contrasena: new FormControl,
    })

    this.validateFormEliminarUsuario = new FormGroup({
      id_usuario: new FormControl,
    })

    this.validateFormCrearMesa = new FormGroup({
      id_estado_mesa: new FormControl,
      id_tipo_mesa: new FormControl
    })
    
    this.validateFormActualizarMesa = new FormGroup({
      id_mesa : new FormControl,
      id_estado_mesa: new FormControl,
      id_tipo_mesa: new FormControl,
      eliminado : new FormControl
    })
  }

  obtenerRoles(){
    this.listRoles = []
    this.administadorService.obtenerRoles().subscribe(resp => {
      let respListRoles = resp["list_roles"]
      for (let rol of respListRoles){
        const unRol : rol = {
          id_rol: rol.id_rol,
          nombre_rol : rol.nombre_rol
        }
        this.listRoles.push(unRol);
      }
      console.log('listRoles', this.listRoles);
      
    })
  }

  // MODAL USUARIOS
  crearUsuario(){
    this.isVisibleCrearUsuario = true;
    this.obtenerRoles();
    this.validateFormCrearUsuario = this.fb.group({
      id_usuario : [null, [Validators.required]],
      rut_usuario: [null, [Validators.required]],
      dv_usuario: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      apellido_paterno: [null, [Validators.required]],
      apellido_materno: [null, [Validators.required]],
      rol: [null, [Validators.required]],
      correo: [null, [Validators.email, Validators.required]],
      contrasena: [null, [Validators.required]]
    })
  }

  cerrarCrearUsuario(){
    this.isVisibleCrearUsuario = false;
    this.validateFormCrearUsuario.reset();
  }

  guardarCrearUsuario(){
    console.log('Servicio crear usuario');
    this.enviarFormularioCrearUsuario();
    var valores = this.validateFormCrearUsuario.value

    if (this.validateFormCrearUsuario.valid){
      var usuarioACrear : user = {
        id_usuario : valores.id_usuario,
        rut: valores.rut_usuario,
        dv: valores.dv_usuario,
        nombre: valores.nombre,
        apellido_paterno: valores.apellido_paterno,
        apellido_materno: valores.apellido_materno,
        rol: valores.rol,
        correo: valores.correo,
        contrasena: valores.contrasena
      }

      console.log('usuarioACrear: ', usuarioACrear);
      this.administadorService.crearUsuario(usuarioACrear).subscribe(resp=>{
        console.log('resp:', resp);
        this.cerrarCrearUsuario();
        this.notification.create(
          'success', 'Usuario creado', resp
        );
      },
      error => {
        // console.log('error', error); 
        this.notification.create(
          'error', 'Error al crear usuario', 'No es posible crear el usuario, lo sentimos'
        )
      });
    }
  }

  // MODAL LISTADO DE USUARIOS
  
  obtenerUsuarios(){
    this.isVisibleListadoUsuarios = true;
    this.listUsuarios =[]
    this.administadorService.obtenerUsuarios().subscribe((resp) =>{
      if (Object.keys(resp).length > 0){
        // console.log('resp',resp);
        for (let user of resp["usuarios"]){
          // console.log('user', user);
          const usuario :user= {
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            apellido_paterno: user.apellido_paterno,
            apellido_materno: user.apellido_materno,
            rol: user.rol,
            rut: user.rut,
            dv : user.dv,
            contrasena: user.contrasena,
            correo: user.correo,
            eliminado : user.eliminado
          }
          this.listUsuarios.push(usuario);
        }
        this.existenUsuarios = true;
        console.log('listUsuarios', this.listUsuarios);        
      }
    });
  }

  okListadoUsuarios(){
    this.isVisibleListadoUsuarios = false;
  }

  //FORMULARIO
  enviarFormularioCrearUsuario(){
    if (this.validateFormCrearUsuario.valid){
      console.log('Formulario válido', this.validateFormCrearUsuario.value);      

    } else {
      console.log('Formulario no válido?', this.validateFormCrearUsuario.value);

      this.notification.create(
        'error', 'Error al crear usuario', 'Debes rellenar todos los campos'
      )

      Object.values(this.validateFormCrearUsuario.controls).forEach(control => {
        // console.log('control', control);
        if (control.invalid) {
          console.log('control inválido');          
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf : true});
        }
      });
    }
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
  }
  
  guardarModificarUsuario(){
    console.log('guardarModificarUsuario');
    console.log('valid ', this.validateFormModificarUsuario.valid);
    if (this.validateFormModificarUsuario.valid){
      console.log('formulario válido, usa el servicio de modificar Receta');
       const unUsuario = ({
        id_usuario : this.validateFormModificarUsuario.value.id_usuario,
        rut: this.validateFormModificarUsuario.value.rut_usuario,
        dv : this.validateFormModificarUsuario.value.dv_usuario,
        nombre : this.validateFormModificarUsuario.value.nombre,
        apellido_paterno : this.validateFormModificarUsuario.value.apellido_paterno,
        apellido_materno : this.validateFormModificarUsuario.value.apellido_materno,
        id_rol : this.validateFormModificarUsuario.value.rol,
        correo : this.validateFormModificarUsuario.value.correo,
        contrasena : this.validateFormModificarUsuario.value.contrasena
       })
      
       console.log('UnUsuario', unUsuario);
      this.administadorService.modificarUsuario(unUsuario).subscribe(resp => {
        // console.log('respuesta a mi servicio modificarReceta', resp);
        this.notification.create(
          'success', 'Modificar usuario', 'Usuario modificado correctamente'
          )
        this.isVisibleModificarUsuario = false;
        this.obtenerUsuarios();
      })
      
      
    }
    else{
      console.log('formulario no válido.');
      
    }
    
  }

  cerrarModificarUsuario(){
    this.isVisibleModificarUsuario = false;
  }

  guardarEliminarUsuario(id_usuario){
     var usuarioAEliminar = {
       id_usuario : id_usuario
     }

     this.administadorService.eliminarUsuario(usuarioAEliminar).subscribe(resp =>{
       console.log('resp', resp);
       if (resp.includes('No se puede eliminar el usuario')){
         this.notification.create(
           'error', 'Error al eliminar el usuario', resp
         )
       }
       else if (resp.includes('usuario correctamente')){
         this.notification.create(
           'success', 'Usuario eliminado', resp
         )
         setTimeout(() => {
           this.obtenerUsuarios();
         }, 1500);
       }
    });
  }


  modificarUsuario(usuario) {
    console.log('modificarUsuario');
    this.isVisibleModificarUsuario = true;
    this.validateFormModificarUsuario = this.fb.group({
      id_usuario: [usuario.id_usuario, [Validators.required]],
      rut_usuario: [usuario.rut, [Validators.required]],
      dv_usuario: [usuario.dv, [Validators.required]],
      nombre: [usuario.nombre, [Validators.required]],
      apellido_paterno: [usuario.apellido_paterno, [Validators.required]],
      apellido_materno: [usuario.apellido_materno, [Validators.required]],
      rol: [usuario.rol, [Validators.required]],
      correo: [usuario.correo, [Validators.email, Validators.required]],
      contrasena: [usuario.contrasena, [Validators.required]],
    })
  }

  eliminarUsuario() {
    console.log('eliminarUsuario');
    this.isVisibleEliminarUsuario = true;
    this.validateFormEliminarUsuario = this.fb.group({
      id_usuario: [null, [Validators.required]],

    })
  }

  guardarCrearMesa(){
    // this.isVisibleCrearMesa = false;
    console.log('validateFormCrearMesa', this.validateFormCrearMesa.value);
    if (this.validateFormCrearMesa.valid){
      console.log('Formulario válido');
      var valores = this.validateFormCrearMesa.value;

      var mesaACrear : Mesa = {
        id_tipo_mesa: valores.id_tipo_mesa,
        id_estado_mesa: valores.id_estado_mesa
      }

      this.administadorService.crearMesa(mesaACrear).subscribe(resp =>{
        console.log('resp', resp);
        if (resp.includes('No se puede crear esta mesa')){
          this.notification.create(
            'error', 'Error al crear mesa', resp
          )
        }
        else{
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

  cerrarCrearMesa(){
    this.isVisibleCrearMesa = false;
  }

  crearMesa(){
    this.isVisibleCrearMesa = true;
    this.validateFormCrearMesa = this.fb.group({
      id_estado_mesa: [null, [Validators.required]],
      id_tipo_mesa: [null, [Validators.required]],
    })
  }

  obtenerMesas(){
    this.administadorService.obtenerMesas().subscribe(resp => {
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
    this.administadorService.obtenerEstadosMesas().subscribe(resp => {
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
    this.administadorService.obtenerTipoMesas().subscribe(resp => {
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

  okListadoMesas(){
    this.isVisibleListadoMesas = false;
    this.isVisibleActualizarMesa = false
  }

  mostrarMesas(){
    this.isVisibleListadoMesas = true;
  }

  seleccionarMesa(mesa){
    if (this.mesaSelected == mesa){
      this.mesaSelected = '';
    }
    else{
      this.mesaSelected = mesa;
    }
    console.log('seleccionarMesa', this.mesaSelected); 
  }

  seleccionarUsuario(usuario){
    if (this.usuarioSelected == usuario){
      this.usuarioSelected = '';
    }
    else{
      this.usuarioSelected = usuario;
    }
    console.log('seleccionarUsuario', this.usuarioSelected);
  }

  actualizarMesa(mesa){
    this.isVisibleActualizarMesa = true;
    this.validateFormActualizarMesa = this.fb.group({
      id_mesa : [mesa.id_mesa, [Validators.required]],
      id_estado_mesa: [mesa.id_estado_mesa, [Validators.required]],
      id_tipo_mesa: [mesa.id_tipo_mesa, [Validators.required]]
    })
  }
  
  guardarActualizarMesa(){
    console.log('validateFormActualizarMesa', this.validateFormActualizarMesa.value);
    if (this.validateFormActualizarMesa.valid){
      console.log('Formulario válido');
      var valores = this.validateFormActualizarMesa.value;

      var mesaAActualizar : Mesa = {
        id_mesa : valores.id_mesa,
        id_tipo_mesa: valores.id_tipo_mesa,
        id_estado_mesa: valores.id_estado_mesa,
      }

      this.administadorService.actualizarMesa(mesaAActualizar).subscribe(resp =>{
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

  guardarEliminarMesa(id_mesa){
    var mesaAEliminar = {
      id_mesa: id_mesa
    }
    // Validación mesa reservada: obtener reserva activa por Id_mesa
    this.administadorService.eliminarMesa(mesaAEliminar).subscribe(resp => {
      console.log('resp', resp);
      if (resp.includes('No se puede eliminar esta mesa')) {
        this.notification.create(
          'error', 'Error al eliminar mesa', resp
        )
      }
      else if (resp.includes('Se eliminó la mesa correctamente')) {
        this.notification.create(
          'success', 'Mesa eliminada', resp
        )
        this.obtenerMesas();
      }
    });
  }
}
