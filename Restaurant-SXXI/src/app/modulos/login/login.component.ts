import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { iniciarSesion } from 'src/app/interfaces/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService : LoginService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router) { }

  ngOnInit() {
    this.validateFormIniciarSesion = this.fb.group({
      id_usuario : [null, [Validators.required]],
      contrasena: [null, [Validators.required]]
    })
  }

  //LogIn
  validateFormIniciarSesion!: FormGroup;

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
  
        this.loginService.iniciarSesion(credenciales).subscribe(resp =>{
          console.log('resp', resp);
          if (resp == 'Accediendo al sistema correctamente'){
            this.notification.create(
              'success', 'Inicio de sesión exitoso', resp
            );
            this.router.navigate(['/administrador'])
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
