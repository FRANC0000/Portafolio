import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocinaComponent } from './cocina.component';


const routes: Routes = [
  { path: '', component:  CocinaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CocinaRoutingModule { }
