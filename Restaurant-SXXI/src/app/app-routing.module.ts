import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './modulos/administrador/administrador.component';
import { LoginComponent } from './modulos/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'administrador', component: AdministradorComponent},
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
