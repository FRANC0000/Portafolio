import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AdministradorModule } from './modulos/administrador/administrador.module';
import { LoginComponent } from './modulos/login/login.component';
import { MesasComponent } from './modulos/mesas/mesas.component';
import { BodegaComponent } from './modulos/bodega/bodega.component';
import { FinanzasComponent } from './modulos/finanzas/finanzas.component';
import { CocinaComponent } from './modulos/cocina/cocina.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzResultModule } from 'ng-zorro-antd/result';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MesasComponent,
    BodegaComponent,
    FinanzasComponent,
    CocinaComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdministradorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzNotificationModule,
    NzIconModule,
    NzToolTipModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzInputNumberModule,
    NzResultModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
