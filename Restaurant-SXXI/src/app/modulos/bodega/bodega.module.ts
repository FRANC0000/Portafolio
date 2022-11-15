import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodegaRoutingModule } from './bodega-routing.module';
import { BodegaComponent } from './bodega.component';


@NgModule({
  declarations: [BodegaComponent],
  imports: [
    CommonModule,
    BodegaRoutingModule
  ]
})
export class BodegaModule { }
