import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './administrador.component';


const routes: Routes = [
  { path: '', component: AdministradorComponent },
  // { path: 'modulo-admin', component: AdministradorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }