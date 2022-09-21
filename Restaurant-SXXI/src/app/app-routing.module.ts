import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './modulos/administrador/administrador.component';


const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'modulo-admin', loadChildren: () => import('./modulos/administrador/administrador.module').then(m => m.AdministradorModule)}
  // { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
