import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './modulos/administrador/administrador.component';
import { BodegaComponent } from './modulos/bodega/bodega.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { CocinaComponent } from './modulos/cocina/cocina.component';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { LoginComponent } from './modulos/login/login.component';
import { MesasComponent } from './modulos/mesas/mesas.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'administrador', component: AdministradorComponent},
  { path: 'cocina', component: CocinaComponent},
  { path: 'bodega', component: BodegaComponent},
  { path: 'cliente', component: ClienteComponent},
  { path: 'mesas', component: MesasComponent},
  { path: 'finanzas', component: FinanzasComponent},
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
