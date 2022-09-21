import { Component } from '@angular/core';
import { AppService } from './app.service';
import { OnInit } from '@angular/core';
import { iniciarSesion, user } from './interfaces/user';
import { FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Restaurant-SXXI';
  listUsuarios : user[] = [];
  existenUsuarios = false;
  isVisibleCrearUsuario = false;
  isVisibleListadoUsuarios = false;
  rolSelected = '';

  //Formulario Crear Usuario
  validateFormCrearUsuario!: FormGroup;

  //LogIn
  validateFormIniciarSesion!: FormGroup;
  
  constructor(
    private appService : AppService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ){}

  ngOnInit(){
    this.validateFormIniciarSesion = this.fb.group({
      id_usuario : [null, [Validators.required]],
      contrasena: [null, [Validators.required]]
    })

    this.validateFormCrearUsuario = new FormGroup({
      id_usuario : new FormControl,
      rut: new FormControl,
      nombre: new FormControl,
      apellido_paterno: new FormControl,
      apellido_materno: new FormControl,
      rol: new FormControl,
      correo: new FormControl,
      contrasena: new FormControl,
    })
  }

  // MODAL USUARIOS
  crearUsuario(){
    this.isVisibleCrearUsuario = true;
    this.validateFormCrearUsuario = this.fb.group({
      id_usuario : [null, [Validators.required]],
      rut: [null, [Validators.required]],
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
        rut: valores.rut,
        nombre: valores.nombre,
        apellido_paterno: valores.apellido_paterno,
        apellido_materno: valores.apellido_materno,
        rol: valores.rol,
        correo: valores.correo,
        contrasena: valores.contrasena
      }

      console.log('usuarioACrear: ', usuarioACrear);
      this.appService.crearUsuario(usuarioACrear).subscribe(resp=>{
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
    this.appService.obtenerUsuarios().subscribe((resp) =>{
      if (Object.keys(resp).length > 0){
        // console.log('resp',resp);
        for (let user of resp["usuarios"]){
          // console.log('user', user);
          const usuario = {
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            apellido_paterno: user.apellido_paterno,
            apellido_materno: user.apellido_materno,
            rol: user.rol,
            rut: user.rut,
            contrasena: user.contrasena,
            correo: user.correo
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

  //LogIn
  enviarInicioSesion(){
    if (this.validateFormIniciarSesion.valid){
      console.log('Formulario válido', this.validateFormIniciarSesion.value);

      let id_usuario = this.validateFormIniciarSesion.value.id_usuario
      let contrasena  = this.validateFormIniciarSesion.value.contrasena

      const credenciales: iniciarSesion={
        id_usuario: id_usuario,
        contrasena: contrasena
      }
      
      console.log('credenciales', credenciales);

      this.appService.iniciarSesion(credenciales).subscribe(resp =>{
        console.log('resp', resp);
        if (resp == 'Accediendo al sistema correctamente'){
          this.notification.create(
            'success', 'Inicio de sesión exitoso', resp
          );
          this.router.navigate(['/modulo-admin'])
        }
        else if (resp == 'Credenciales incorrectas'){
          this.notification.create(
            'error', 'Inicio de sesión fallido', resp
          );
        }
        else{
          this.notification.create(
            'warning', 'Problemas para autenticar', 'No fue posible autenticar sus credenciales, lo sentimos :('
          );
        }        
      },
      error => {
        // console.log('error', error); 
        this.notification.create(
          'error', 'Error al iniciar sesión', 'Contactar con un administrador'
        )
      });

    } else {
      console.log('Formulario no válido?', this.validateFormIniciarSesion.value);

      this.notification.create(
        'error', 'Error al iniciar sesión', 'Debes ingresar con tus credenciales'
      )

      Object.values(this.validateFormIniciarSesion.controls).forEach(control => {
        // console.log('control', control);
        if (control.invalid) {
          console.log('control inválido');          
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf : true});
        }
      });
    }
  }

}
