import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isInteger, NzNotificationService } from 'ng-zorro-antd';
import { Producto, ProductosReceta, Receta, TipoProducto } from 'src/app/interfaces/cocina';
import { EstadoMesa, Mesa, TipoMesa } from 'src/app/interfaces/mesa';
import { Reporte } from 'src/app/interfaces/reporte';
import { rol, user } from 'src/app/interfaces/user';
import { AdministadorService } from './administador.service';

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { BuzonEntrada, Registro } from 'src/app/interfaces/registro';
import { Boleta, InstanciarBoleta } from 'src/app/interfaces/carrito-compras';
import { parse } from 'querystring';
pdfMake.vfs =  pdfFonts.pdfMake.vfs

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
  ) {
    
   }

  usuarioLogeado :string = localStorage.getItem('id_usuario');
  rolUsuarioLogeado : string = localStorage.getItem('rol');

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
  isVisibleCrearPlato = false;
  formDataPlato = new FormData();
  formDataPdfReporte = new FormData();
  validateFormCrearPlato!: FormGroup;
  visibleDetalleProdcuto = false;
  validateFormModificarProducto : FormGroup;
  isVisibleModificarProducto = false;
  formDataProducto = new FormData();
  listaProductos : Producto[] = [];
  visibleDetalleReceta = false;
  isVisibleModificarReceta = false;
  validateFormModificarReceta!: FormGroup;
  listaRecetas : Receta[] = [];
  recetaSelected;
  visibleDetallePlato = false;
  platoSelected;
  productoSelected;
  validateFormCrearReceta!: FormGroup;
  listProductosReceta : ProductosReceta[] = [];
  isVisibleCrearReceta = false;
  validateFormCrearProducto!: FormGroup;
  isVisibleCrearProducto = false; 
  now = new Date();
  listaTipoProducto: TipoProducto[] = [];
  isVisibleCrearProductoReceta = false;
  validateFormCrearProductosReceta : FormGroup;
  cantidadProductoReceta : number = 1;
  isVisibleListadoProductos = false;
  listReportes;
  listSolicitudesReabastecimiento;
  isVisibleCrearReporte = false;
  validateFormCrearReporte : FormGroup;
  listTipoReportes;
  isVisibleVerReportes = false;
  mostrarDetalleVistaReporte = false;
  valoresRespuestaObtenerReporte = [];
  cantidadIngresoPorClienteMes = [];
  clientesAtendidosMes = [];
  clientesAtendidosPorBoleta = [];
  tipoReporteSelected = 0;
  obtenerPlatosConsumidos = [];
  reporteReabastecimiento = [];
  isVisibleSolicitudReabastecimiento = false;
  buzonEntrada : BuzonEntrada[] = [];
  listaRegistrosRecepcionSolicitudReabastecimientoModificada = [];
  listaRegistrosRecepcionSolicitudReabastecimientoAprobada = [];
  isVisibleMostrarRegistrosAprobadas = false;

  ngOnInit() {
    console.log('usuarioLogeado', this.usuarioLogeado);
    console.log('rolUsuarioLogeado', this.rolUsuarioLogeado);
    this.obtenerRoles();
    this.obtenerMesas();
    this.obtenerEstadosMesas();
    this.obtenerTiposMesas();
    this.obtenerProductos();
    this.obtenerTipoProducto();
    this.obtenerClientes();
    this.obtenerSolicitudReabastecimientoAprobada();
    this.obtenerSolicitudReabastecimientoModificada();

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
    this.validateFormModificarProducto = new FormGroup({
      id_producto : new FormControl,
      comentario : new FormControl,
      fecha_ingreso_producto : new FormControl,
      fecha_vencimiento : new FormControl,
      medida_producto : new FormControl,
      nombre_producto : new FormControl,
      stock_producto : new FormControl,
      valor_unitario : new FormControl,
      tipo_producto : new FormControl,
      stock_ideal : new FormControl,
    })
    this.validateFormModificarReceta = new FormGroup({
      comentario: new FormControl,
      complejidad: new FormControl,
      tiempo_preparacion: new FormControl,
    })
    this.validateFormCrearReceta = new FormGroup({
      comentario: new FormControl,
      complejidad: new FormControl,
      tiempo_preparacion: new FormControl
    })
    this.validateFormCrearProducto = new FormGroup({
      comentario: new FormControl,
      fecha_ingreso_producto : new FormControl,
      fecha_vencimiento: new FormControl,
      medida_producto: new FormControl,
      nombre_producto: new FormControl,
      stock_producto: new FormControl,
      valor_unitario: new FormControl,
      tipo_producto : new FormControl,
      stock_ideal: new FormControl
    })
    this.validateFormCrearProductosReceta = new FormGroup({
      id_producto : new FormControl,
      nombre_producto : new FormControl,
      cantidad : new FormControl,
      comentario : new FormControl,
    })
    this.validateFormCrearReporte = new FormGroup({
      comentario : new FormControl,
      extension : new FormControl,
      fecha_creacion : new FormControl,
      nombre_creacion : new FormControl,
      titulo_reporte : new FormControl,
      id_tipo_reporte : new FormControl,
      id_usuario : new FormControl,
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

  obtenerSolicitudReabastecimientoAprobada(){
    this.administadorService.obtenerSolicitudReabastecimientoAprobada().subscribe(resp=>{
      this.listaRegistrosRecepcionSolicitudReabastecimientoAprobada = resp['registros']

      console.log('listaRegistrosRecepcionSolicitudReabastecimientoAprobada', this.listaRegistrosRecepcionSolicitudReabastecimientoAprobada);

      for (let reg of this.listaRegistrosRecepcionSolicitudReabastecimientoAprobada){
        let bzE : BuzonEntrada = {
          registro : Object(reg),
          esAprobado : true,
          esRechazado : false,
          esEnviada : false
        }
        this.buzonEntrada.push(bzE);
      }
      this.quitarUltimaVersionFalseBuzon();
      console.log('buzon',this.buzonEntrada);
    })    
  }

  obtenerSolicitudReabastecimientoModificada(){
    this.administadorService.obtenerSolicitudReabastecimientoModificada().subscribe(resp=>{
      this.listaRegistrosRecepcionSolicitudReabastecimientoModificada = resp['registros']

      console.log('listaRegistrosRecepcionSolicitudReabastecimientoModificada', this.listaRegistrosRecepcionSolicitudReabastecimientoModificada);

      for (let reg of this.listaRegistrosRecepcionSolicitudReabastecimientoModificada){
        let bzE : BuzonEntrada = {
          registro : Object(reg),
          esAprobado : true,
          esRechazado : false,
          esEnviada : false
        }
        this.buzonEntrada.push(bzE);
      }
      this.quitarUltimaVersionFalseBuzon();
      console.log('buzon',this.buzonEntrada);
    })    
  }

  quitarUltimaVersionFalseBuzon(){
    this.buzonEntrada = this.buzonEntrada.filter( b=> {
      return b.registro['ultima_version'] != false
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
    localStorage.clear();
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

  crearPlato() {
    this.isVisibleCrearPlato = true; //para abrir la ventana emergente, luego hay que cerrarla en otra funcion
    this.formDataPlato = new FormData();
    this.validateFormCrearPlato = this.fb.group({
      cantidad_personas_recomendadas: [null, [Validators.required]],
      comentario: [null, [Validators.required]],
      descripcion_plato: [null, [Validators.required]],
      disponibilidad: [null, [Validators.required]],
      nombre_plato: [null, [Validators.required]],
      precio_plato: [null, [Validators.required]],
      id_tipo_plato: [null, [Validators.required]],
    })
  }

  cerrarCrearPlato(){
    this.isVisibleCrearPlato = false;
    this.validateFormCrearPlato.reset();
  }

  cerrarDrawerDetalleProducto(){
    this.visibleDetalleProdcuto = false;
    this.isVisibleModificarProducto = false;
    this.validateFormModificarProducto = null;
  }

  modificarProducto(producto){
    this.formDataProducto = new FormData();
    this.isVisibleModificarProducto = true;
    console.log('producto', producto);
    
    this.validateFormModificarProducto = this.fb.group({
      id_producto : [producto.id_producto, [Validators.required]],
      comentario : [producto.comentario, [Validators.required]],
      fecha_ingreso_producto : [producto.fecha_ingreso_producto, [Validators.required]],
      fecha_vencimiento : [producto.fecha_vencimiento, [Validators.required]],
      medida_producto : [producto.medida_producto, [Validators.required]],
      nombre_producto : [producto.nombre_producto, [Validators.required]],
      stock_producto : [producto.stock_producto, [Validators.required]],
      valor_unitario : [producto.valor_unitario, [Validators.required]],
      tipo_producto : [producto.id_tipo_producto, [Validators.required]],
      stock_ideal : [producto.stock_ideal, [Validators.required]],
    })
  }

  guardarModificarProducto(id_producto){
    // console.log('id_producto', id_producto);
    // console.log('form', this.validateFormModificarProducto.value);
    let fecha_ingreso_format
    let fecha_vencimiento_format
    var datePipe = new DatePipe('en-US');

    if (Object.prototype.isPrototypeOf(this.validateFormModificarProducto.value.fecha_ingreso_producto)){
      // console.log('es objeto');
      fecha_ingreso_format = this.validateFormModificarProducto.value.fecha_ingreso_producto.toLocaleDateString();
    }
    else{
      // console.log('es string');
      fecha_ingreso_format = datePipe.transform(this.validateFormModificarProducto.value.fecha_ingreso_producto, 'dd/MM/yyyy')
    }

    if (Object.prototype.isPrototypeOf(this.validateFormModificarProducto.value.fecha_vencimiento)){
      // console.log('es objeto');
      fecha_vencimiento_format = this.validateFormModificarProducto.value.fecha_vencimiento.toLocaleDateString();
    }
    else{
      // console.log('es string');
      fecha_vencimiento_format = datePipe.transform(this.validateFormModificarProducto.value.fecha_vencimiento, 'dd/MM/yyyy')
    }

    const productoAModificar  = {
      "id_producto" : id_producto,
      "comentario" : this.validateFormModificarProducto.value.comentario,
      "fecha_ingreso_producto" : fecha_ingreso_format,
      "fecha_vencimiento": fecha_vencimiento_format,
      "medida_producto" : this.validateFormModificarProducto.value.medida_producto,
      "nombre_producto" : this.validateFormModificarProducto.value.nombre_producto,
      "stock_producto" : this.validateFormModificarProducto.value.stock_producto,
      "valor_unitario" : this.validateFormModificarProducto.value.valor_unitario,
      "tipo_producto" : this.validateFormModificarProducto.value.tipo_producto,
      "stock_ideal" : this.validateFormModificarProducto.value.stock_ideal,
    }

    console.log('productoAModificar', productoAModificar);
    
    this.administadorService.modificarProducto(productoAModificar).subscribe(resp =>{
      console.log('resp', resp);
      
      if (resp.includes('correctamente')){
        this.notification.create(
          'success', 'Producto modificado', 'Producto #'+id_producto
        )
        this.cerrarDrawerDetalleProducto();
        this.formDataProducto.append("id_producto", id_producto);
        this.administadorService.subirImagenProducto(this.formDataProducto).subscribe(resp=>{
        console.log(resp)
        })

        setTimeout(() => {
          this.obtenerProductos();
        }, 1500);
      }
    })
  }

  obtenerProductos(){
    this.administadorService.obtenerProductos().subscribe(resp=>{
      this.listaProductos = resp['productos'].sort((a,b) =>{
        if(a.id_producto < b.id_producto){
          return -1
        }
        if (a.id_producto > b.id_producto){
          return 1
        }
        return 0;
      })
      console.log('listaProductos', this.listaProductos);
    })
  }

  cerrarDrawerDetalleReceta(){
    this.visibleDetalleReceta = false;
    this.isVisibleModificarReceta = false;
  }

  guardarModificarReceta(id_receta){
    console.log('guardarModificarReceta');
    console.log('valid ', this.validateFormModificarReceta.valid);
    if (this.validateFormModificarReceta.valid){
      console.log('formulario válido, usa el servicio de modificar Receta');
      console.log('valores', this.validateFormModificarReceta.value);
      if (this.validateFormModificarReceta.value.comentario == null){
        this.validateFormModificarReceta.value.comentario = '';
      }
      const unaReceta = {
        id_receta : id_receta,
        comentario: this.validateFormModificarReceta.value.comentario,
        complejidad : this.validateFormModificarReceta.value.complejidad,
        tiempoPreparacion : this.validateFormModificarReceta.value.tiempo_preparacion
      }
      console.log('UnaReceta', unaReceta);
      this.administadorService.modificarReceta(unaReceta).subscribe(resp => {
        console.log('respuesta a mi servicio modificarReceta', resp);
        this.isVisibleModificarReceta = false;
        this.cerrarDrawerDetalleReceta();
        setTimeout(() => {
           this.obtenerRecetas();
        }, 1500);
        
      })
      
      
    }
    else{
      console.log('formulario no válido.');
    }
  }

  obtenerRecetas(){
    this.listaRecetas = [];
    this.administadorService.obtenerRecetas().subscribe(resp => {

      this.listaRecetas = resp["listado_recetas"].sort(function(a,b){
            if(a.id_receta < b.id_receta){
              return -1
            }
            if (a.id_receta > b.id_receta){
              return 1
            }
            return 0;
          })
      console.log('listaRecetas', this.listaRecetas);
    })
  }

  verDetalleReceta(receta){
    console.log('verDetalleReceta', receta);
    this.recetaSelected = receta
    this.visibleDetalleReceta = true;
  }

  verDetallePlato(plato){
    this.visibleDetallePlato = true;
    this.platoSelected = plato;
    console.log('platoSelected', this.platoSelected);
  }

  verDetalleProducto(producto){
    this.visibleDetalleProdcuto = true;
    this.productoSelected = producto;
    console.log('productoSelected', this.productoSelected);
  }

  guardarCrearReceta(){
    console.log('guardarCrearReceta');
    console.log('valid ', this.validateFormCrearReceta.valid);
    if (this.validateFormCrearReceta.valid && this.listProductosReceta.length > 0){
      console.log('formulario válido, usa el servicio de crear Receta');
      console.log('valores', this.validateFormCrearReceta.value);
      console.log('listProductosReceta', this.listProductosReceta);
      
      const unaReceta = {
        comentario: this.validateFormCrearReceta.value.comentario,
        complejidad : this.validateFormCrearReceta.value.complejidad,
        tiempoPreparacion : this.validateFormCrearReceta.value.tiempo_preparacion,
        productosEnReceta : this.listProductosReceta
      }
      console.log('UnaReceta', unaReceta);
      this.administadorService.crearReceta(unaReceta).subscribe(resp => {
        console.log('respuesta a mi servicio crearReceta', resp);
        // this.obtenerRecetas();
        this.isVisibleCrearReceta = false;
      })
      this.notification.create(
        'success', 'Receta creada', ''
      )
    }
    else{
      console.log('formulario no válido.');
      this.notification.create(
        'error', 'Formulario no válido', 'Debes rellenar correctamente el formulario'
      )
    }
    
  }

  crearReceta(){
    console.log('crearReceta');
    this.isVisibleCrearReceta = true;
    this.validateFormCrearReceta = this.fb.group({
      comentario :[null, [Validators.required]],
      complejidad :[null, [Validators.required]],
      tiempo_preparacion :[null, [Validators.required]]
    })
  }

  cerrarCrearReceta(){
    this.isVisibleCrearReceta = false;
  }

  guardarCrearProducto(){
    if (this.validateFormCrearProducto.valid){
      console.log('valid');

      if (this.validateFormCrearProducto.value.comentario == null){
        this.validateFormCrearProducto.value.comentario = ''
      }

      const unProducto = {
        "comentario": this.validateFormCrearProducto.value.comentario,
        "fecha_ingreso_producto": this.validateFormCrearProducto.value.fecha_ingreso_producto,
        "fecha_vencimiento": this.validateFormCrearProducto.value.fecha_vencimiento.toLocaleDateString(),
        "medida_producto": this.validateFormCrearProducto.value.medida_producto,
        "nombre_producto": this.validateFormCrearProducto.value.nombre_producto,
        "stock_producto": this.validateFormCrearProducto.value.stock_producto,
        "valor_unitario": this.validateFormCrearProducto.value.valor_unitario,
        "tipo_producto": this.validateFormCrearProducto.value.tipo_producto,
        "stock_ideal": this.validateFormCrearProducto.value.stock_ideal,
      }
      console.log('unProducto', unProducto);

      this.administadorService.crearProducto(unProducto).subscribe(resp=>{
        console.log('resp', resp);

        this.formDataProducto.append("id_producto", resp);
        this.administadorService.subirImagenProducto(this.formDataProducto).subscribe(resp=>{
        console.log(resp)
        })

        setTimeout(() => {
          this.obtenerProductos();
        }, 1500);

        this.notification.create(
          'success', 'Formulario válido', ''
        )
        this.cerrarCrearProducto();
      })
    }
    else{
      console.log('invalid');
      this.notification.create(
        'error', 'Formulario inválido', ''
      )
    }
  }

  crearProducto(){
    this.now = new Date();
    this.isVisibleCrearProducto = true; 
    this.formDataProducto = new FormData();
    this.obtenerTipoProducto();
    this.validateFormCrearProducto = this.fb.group({
      comentario: [null],
      fecha_ingreso_producto : [this.now.toLocaleDateString(), [Validators.required]],
      fecha_vencimiento: [null, [Validators.required]],
      medida_producto: [null, [Validators.required]],
      nombre_producto: [null, [Validators.required]],
      stock_producto: [null, [Validators.required]],
      valor_unitario: [null, [Validators.required]],
      tipo_producto : [null, [Validators.required]],
      stock_ideal: [null, [Validators.required]]
    })

    console.log('Crear Producto');
  }

  cerrarCrearProducto(){
    this.isVisibleCrearProducto = false; 
  }

  obtenerTipoProducto(){
    this.listaTipoProducto = []
    this.administadorService.obtenerTipoProducto().subscribe(resp => {
      // console.log("resp",resp);
      let listaTipoProducto = resp["listTipoProducto"]
      for (let tp of listaTipoProducto){
        const tipo_producto : TipoProducto = {
          id_tipo_producto : tp.id_tipo_producto,
          comentario : tp.comentario,
          nombre_tipo_producto : tp.nombre_tipo_producto
        }
        this.listaTipoProducto.push(tipo_producto);
      }
      console.log('listaTipoProducto', this.listaTipoProducto);
    })
  }

  onFileSelectedPlato(e){
    const file:File = e.target.files[0];
    console.log('file',file);
    this.formDataPlato.append("fichero", file);

    this.notification.create(
      'success', 'Imagen añadida', ''
    )
  }

  onFileSelectedProducto(e){
    const file:File = e.target.files[0];
    this.formDataProducto.append("fichero", file);
    this.notification.create(
      'success', 'Imagen añadida', ''
    )
  }

  mostrarModalAgregarIngrediente(producto){
    this.validateFormCrearProductosReceta = this.fb.group({
      id_producto : [producto.id_producto, [Validators.required]],
      nombre_producto : [producto.nombre_producto, [Validators.required]],
      cantidad: [this.cantidadProductoReceta, [Validators.required, Validators.max(producto.stock_producto)]],
      comentario : [null],
    })
    this.cantidadProductoReceta = 1;
    this.isVisibleCrearProductoReceta = true;
  }

  cancelarCrearProductoReceta(){
    this.validateFormCrearProductosReceta.reset();
    this.isVisibleCrearProductoReceta = false;
    this.cantidadProductoReceta = 1;
  }

  guardarProductoEnReceta(){
    if(this.validateFormCrearProductosReceta.valid){
      // console.log('valores', this.validateFormCrearProductosReceta.value);
      if (this.validateFormCrearProductosReceta.value.comentario == null){
        this.validateFormCrearProductosReceta.value.comentario = '';
      }
      this.validateFormCrearProductosReceta.value.cantidad = this.cantidadProductoReceta;

      const productoEnReceta : ProductosReceta = {
        id_producto : this.validateFormCrearProductosReceta.value.id_producto,
        nombre_producto : this.validateFormCrearProductosReceta.value.nombre_producto,
        cantidad : this.validateFormCrearProductosReceta.value.cantidad,
        comentario : this.validateFormCrearProductosReceta.value.comentario
      }
      
      let existe = this.listProductosReceta.some(p => {
        return p.id_producto === productoEnReceta.id_producto
      })

      console.log('existe', existe);

      if(existe){
        let indexProd = this.listProductosReceta.findIndex(p =>{
          return p.id_producto === productoEnReceta.id_producto
        })
        this.listProductosReceta.splice(indexProd, 1);
        this.listProductosReceta.push(productoEnReceta);
      }
      else{
        this.listProductosReceta.push(productoEnReceta);
      }
      console.log('listProductosReceta',this.listProductosReceta);
      
      this.notification.create(
        'success', 'Formulario válido', ''
      )

      document.getElementById(this.validateFormCrearProductosReceta.value.id_producto).setAttribute('disabled', '');
      
      this.cancelarCrearProductoReceta();
    }
    else{
      console.log('controles', this.validateFormCrearProductosReceta.controls);
      this.notification.create(
        'error', 'Formulario inválido', 'Debes ingresar correctamente los datos'
      )
    }
  }

  quitarCantidadProductoReceta(){
    // console.log('quitarCantidadProductoReceta');
    if(this.cantidadProductoReceta > 1){
      this.cantidadProductoReceta -= 1;
    }
    // console.log(this.cantidadProductoReceta);
  }

  agregarCantidadProductoReceta(){
    // console.log('agregarCantidadProductoReceta');
    this.cantidadProductoReceta += 1;
    // console.log(this.cantidadProductoReceta);
  }

  quitarIngredienteDeReceta(prod){
    let indexProd = this.listProductosReceta.findIndex(p =>{
      return p.id_producto === prod.id_producto
    })
    this.listProductosReceta.splice(indexProd, 1);
    document.getElementById(prod.id_producto).removeAttribute('disabled');
    console.log('listProductosReceta',this.listProductosReceta);
  }

  modificarIngredienteDeReceta(prod){
    console.log('modificarIngredienteDeReceta');
    this.cantidadProductoReceta = prod.cantidad;
    this.validateFormCrearProductosReceta = this.fb.group({
      id_producto : [prod.id_producto, [Validators.required]],
      nombre_producto : [prod.nombre_producto, [Validators.required]],
      cantidad: [this.cantidadProductoReceta, [Validators.required]],
      comentario : [prod.comentario],
    })
    this.isVisibleCrearProductoReceta = true;
  }

  navegarAMesas(){
    this.router.navigate(['/mesas'])
  }

  navegarABodega(){
    this.router.navigate(['/bodega'])
  }

  navegarAFinanzas(){
    this.router.navigate(['/finanzas'])
  }

  navegarACocina(){
    this.router.navigate(['/cocina'])
  }

  mostrarProductos(){
    this.isVisibleListadoProductos = true;
  }

  okListadoProductos(){
    this.isVisibleListadoProductos = false;
    this.isVisibleModificarProducto = false;
  }

  guardarEliminarProducto(id_producto){
    console.log('id_producto', id_producto);
    const productoAEliminar = {
      "id_producto" : id_producto
    }

    this.administadorService.eliminarProducto(productoAEliminar).subscribe(resp =>{
      console.log('resp', resp);
      this.notification.create(
        'success', 'Producto eliminado', 'Producto #' + id_producto
      )
      this.cerrarDrawerDetalleProducto();
      setTimeout(() => {
        this.obtenerProductos();
      }, 1500);
    })
  }

  seleccionarProducto(producto){
    if (this.productoSelected == producto){
      this.productoSelected = '';
    }
    else{
      this.productoSelected = producto;
    }
    console.log('seleccionarProducto', this.productoSelected); 
  }

  listClientes;
  isVisibleListadoClientes = false;

  obtenerClientes(){
    this.administadorService.obtenerClientes().subscribe(resp=>{
      this.listClientes = resp['clientes'];
      console.log('listClientes', this.listClientes);
    })
  }

  okListadoClientes(){
    this.isVisibleListadoClientes = false;
  }

  mostrarClientes(){
    this.isVisibleListadoClientes = true;
  }

  obtenerReporteStock(){
    this.administadorService.obtenerReporteStock().subscribe(resp=>{
      this.valoresRespuestaObtenerReporte = [];
      for (let re in resp){
        // console.log('re', re);
        let r = resp[re].split(",");
        // console.log('r', r);
        this.valoresRespuestaObtenerReporte.push(r)
      }
      console.log('this.valoresRespuestaObtenerReporte', this.valoresRespuestaObtenerReporte);
      
    })
  }

  obtenerReporteReabastecimiento(){
    this.administadorService.obtenerReporteReabastecimiento().subscribe(resp=>{
      this.reporteReabastecimiento = [];
      for (let re in resp){
        // console.log('re', re);
        let r = resp[re].split(",");
        // console.log('r', r);
        this.reporteReabastecimiento.push(r)
      }
      console.log('this.reporteReabastecimiento', this.reporteReabastecimiento);
      
    })
  }

  obtenerReporteVistaPlatosConsumidos(){
    this.administadorService.obtenerReporteVistaPlatosConsumidos().subscribe(resp=>{
      this.obtenerPlatosConsumidos = [];
      for (let re in resp){
        // console.log('re', re);
        let r = resp[re].split(",");
        // console.log('r', r);
        this.obtenerPlatosConsumidos.push(r)
      }
      console.log('this.obtenerPlatosConsumidos', this.obtenerPlatosConsumidos);
      
    })
  }

  obtenerReporteClientesAtendidos(){
    this.administadorService.obtenerReporteClientesAtendidos().subscribe(resp=>{
      this.cantidadIngresoPorClienteMes = []
      this.clientesAtendidosMes = []
      this.clientesAtendidosPorBoleta = []
      
      for (let re of resp['clientes_atendidos_mes']){
        console.log('re', re);
        // let r = resp[re]
        this.clientesAtendidosMes.push(re)
      }
      console.log('this.clientesAtendidosMes', this.clientesAtendidosMes);
      
      for (let re of resp['cantidad_ingresos_por_cliente_mes']){
        console.log('re', re);
        let r = re.split(",");
        this.cantidadIngresoPorClienteMes.push(r)
      }
      console.log('this.cantidadIngresoPorClienteMes', this.cantidadIngresoPorClienteMes);
      
      for (let re of resp['clientes_atendidos_por_boleta']){
        console.log('re', re);
        let r = re.split(",");
        this.clientesAtendidosPorBoleta.push(r)
      }
      console.log('this.clientesAtendidosPorBoleta', this.clientesAtendidosPorBoleta);
      
    })
  }

  crearReporte(){
    this.isVisibleCrearReporte = true;
    this.obtenerTipoReporte();
    this.validateFormCrearReporte = this.fb.group({
      comentario: [null, [Validators.required]],
      extension: ['.pdf', [Validators.required]],
      fecha_creacion: [this.now.toLocaleDateString(), [Validators.required]],
      nombre_creacion: ['prueba', [Validators.required]],
      titulo_reporte: [null, [Validators.required]],
      id_tipo_reporte: [null, [Validators.required]],
      id_usuario: [this.usuarioLogeado, [Validators.required]]
    })
  }

  obtenerTipoReporte() {
    this.administadorService.obtenerTipoReporte().subscribe(resp => {
      console.log('resp', resp);
      this.listTipoReportes = resp['tipos_reporte'];
    })
  }

  obtenerReportes() {
    this.administadorService.obtenerReportes().subscribe(resp => {
      console.log('resp', resp);
      this.listReportes = resp['reportes'].filter(r =>{
        return r.eliminado != true
      });
    })
  }

  obtenerSolicitudesReabastecimiento() {
    this.administadorService.obtenerReportes().subscribe(resp => {
      console.log('resp', resp);
      this.listSolicitudesReabastecimiento = resp['reportes'].filter(r =>{
        return r.eliminado != true && r.id_tipo_reporte == 4
      });
    })
  }
  listRegistros = []
  obtenerRegistros() {
    this.administadorService.obtenerRegistros().subscribe(resp => {
      console.log('resp', resp);
      this.listRegistros = resp['registros']
    })
  }

  cerrarCrearReporte(){
    this.isVisibleCrearReporte = false;
    this.mostrarDetalleVistaReporte = false;
    this.validateFormCrearReporte.reset();
  }

  guardarCrearReporte(){
    console.log('Servicio crear reporte');
    this.formDataPdfReporte = new FormData();
    // this.enviarFormularioCrearReporte();
    var valores = this.validateFormCrearReporte.value

    //aqui tienes que manipular el valor título que va a ayudarte a crear el nombre_creacion y extension
    //ej: titulo es: Reporte de stock de 14-11-22 => nombre_creacion: reporte_stock_14_11_22.pdf //substr //trim typescript
    this.validateFormCrearReporte.value.titulo_reporte //substr trim
    this.validateFormCrearReporte.value.nombre_creacion = "pruebas" 
    this.validateFormCrearReporte.value.extension = '.pdf'

    console.log('this.validateFormCrearReporte', this.validateFormCrearReporte);
    

    if (this.validateFormCrearReporte.valid){
      let registroAIngresar : Registro;
      if (this.tipoReporteSelected == 1){
        let tabla = [];
        let headerTabla = ['#', 'Nombre', 'Medida', 'Stock ideal', 'Stock actual', '%RI', '%F', 'Acción', 'Tipo', 'Venc.']
        tabla.push(headerTabla);

        for (let i of this.valoresRespuestaObtenerReporte) {
          tabla.push(i)
        }
        console.log('tabla', tabla);
        this.validateFormCrearReporte.value.nombre_creacion = "Reporte_stock_"+this.now.getDate()+this.now.getMonth()+this.now.getFullYear()+this.now.getHours()+this.now.getMinutes()+"_"+this.usuarioLogeado+'.pdf';
        
        const pdfDefinitions = {
          content: [
            {
              text: 'Reporte de stock', alignment: 'center', style: 'header',
              margin: [0, 10, 0, 30]
            },
            {
              text: 'Este reporte de stock fue generado el día ' + this.now.toLocaleString() + ' por el usuario ' + this.usuarioLogeado + ' y representan un listado de todos los productos con sus stock actuales e ideales. Este documento será utilizado para gestión y apoyo en la toma de decisiones del propio Restaurant Siglo XXI.' , 
              margin: [0, 0, 0, 20] //izquierda, arriba, derecha, abajo
            },
            {
              table: {
                body: tabla
              }
            },
          ],
          footer: [
            {
              text: 'TLNS S.A.', alignment: 'center', fontSize: 10
            },
            {
              text: this.now.getFullYear(),  alignment: 'center', fontSize: 8,
              margin: [0, 5, 0, 0]
            }
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
            },
            subheader: {
              fontSize: 15,
              bold: true
            },
            quote: {
              italics: true
            },
            small: {
              fontSize: 8
            }
          }
        }

        // const pdf = pdfMake.createPdf(pdfDefinitions).download(this.validateFormCrearReporte.value.nombre_creacion);
        // pdf.download();
        const pdf = pdfMake.createPdf(pdfDefinitions)

        registroAIngresar = {
          descripcion : this.validateFormCrearReporte.value.comentario,
          id_estado_registro : 1,
          id_modulo : 1,
          id_registro_padre : -1,
          id_tipo_registro : 2, //tipo_registro 1 = Reporte de inventario
          id_usuario : this.usuarioLogeado,
          titulo_registro : this.validateFormCrearReporte.value.titulo_reporte,
          version : 1
        }

        // pdf.open();
        pdf.getBlob((blob) => {
          // console.log('blob', blob);
          this.formDataPdfReporte.append("fichero", blob);
          this.formDataPdfReporte.append("nombre", this.validateFormCrearReporte.value.nombre_creacion);
          this.administadorService.subirPdfReporte(this.formDataPdfReporte).subscribe(resp =>{
            // console.log('resp', resp);
          })
        });
      }
      else if (this.tipoReporteSelected == 2){
        //reporte de clientes atendidos
      }
      else if (this.tipoReporteSelected == 3){
        //reporte de platos consumidos
      }
      else if (this.tipoReporteSelected == 4){

        let tabla = [];
        let headerTabla = ['#', 'Nombre', 'Medida', 'Stock ideal', 'Stock actual', '%S.R.I.', 'Valor un.', 'Cant. comprar', 'Valor X Cant']
        tabla.push(headerTabla);

        let totalAComprar = 0;
        for (let i of this.reporteReabastecimiento) {
          totalAComprar += parseInt(i[8])
          tabla.push(i)
        }
        console.log('tabla', tabla);
        
        let tabla2 =  []
        tabla2.push(['Total'])
        tabla2.push(['$'+totalAComprar])
        console.log('tabla2', tabla2);

        this.validateFormCrearReporte.value.nombre_creacion = "Reporte_reabastecimiento_"+this.now.getDate()+this.now.getMonth()+this.now.getFullYear()+this.now.getHours()+this.now.getMinutes()+"_"+this.usuarioLogeado+'.pdf';
        
        const pdfDefinitions :any = {
          content: [
            {
              text: 'Reporte de reabastecimiento', alignment: 'center', style: 'header',
              margin: [0, 10, 0, 30]
            },
            {
              text: 'Este reporte de reabastecimiento fue generado el día ' + this.now.toLocaleString() + ' por el usuario ' + this.usuarioLogeado + ' y representan los productos que requieren de reabastecerse. Este documento será utilizado para gestión y apoyo en la toma de decisiones del propio Restaurant Siglo XXI.' , 
              margin: [0, 0, 0, 20] //izquierda, arriba, derecha, abajo
            },
            {
              table: {
                body: tabla
              }
            },
            {
              table : {
                body: tabla2
              }, margin: [455, 10, 0, 0]
            }
          ],
          footer: [
            {
              text: 'TLNS S.A.', alignment: 'center', fontSize: 10
            },
            {
              text: this.now.getFullYear(),  alignment: 'center', fontSize: 8,
              margin: [0, 5, 0, 0]
            }
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
            },
            subheader: {
              fontSize: 15,
              bold: true
            },
            quote: {
              italics: true
            },
            small: {
              fontSize: 8
            }
          }
        }

        console.log('json pdf string', JSON.stringify(pdfDefinitions));
        console.log('json datos tabla string', JSON.stringify(tabla));

        // const pdf = pdfMake.createPdf(pdfDefinitions).download(this.validateFormCrearReporte.value.nombre_creacion);
        // pdf.download();
        const pdf = pdfMake.createPdf(pdfDefinitions)

        registroAIngresar = {
          descripcion : this.validateFormCrearReporte.value.comentario,
          id_estado_registro : 2, //estado_registro 2 = Recepcionar solicitud de reabastecimiento (bodega)
          id_modulo : 1,
          id_registro_padre : -1,
          id_tipo_registro : 1, //tipo_registro 1 = Solicitud de reabastecimiento
          id_usuario : this.usuarioLogeado,
          titulo_registro : this.validateFormCrearReporte.value.titulo_reporte,
          version : 1
        }

        // pdf.open();
        // console.log('pdf', pdf);
        pdf.getBlob((blob) => {
          // console.log('blob', blob);
          this.formDataPdfReporte.append("fichero", blob);
          this.formDataPdfReporte.append("nombre", this.validateFormCrearReporte.value.nombre_creacion);
          this.administadorService.subirPdfReporte(this.formDataPdfReporte).subscribe(resp =>{
            // console.log('resp', resp);
           
          })
        });
      }
      const reporteACrear : Reporte = {
        comentario : this.validateFormCrearReporte.value.comentario,
        extension : this.validateFormCrearReporte.value.extension,
        fecha_creacion : this.validateFormCrearReporte.value.fecha_creacion,
        id_tipo_reporte : this.validateFormCrearReporte.value.id_tipo_reporte,
        id_usuario : this.validateFormCrearReporte.value.id_usuario,
        nombre_creacion : this.validateFormCrearReporte.value.nombre_creacion,
        titulo_reporte : this.validateFormCrearReporte.value.titulo_reporte
      }

      console.log('reporteACrear: ', reporteACrear);
      this.administadorService.crearReporte(reporteACrear).subscribe(resp=>{
        console.log('resp:', resp);
        // this.cerrarCrearReporte();
        registroAIngresar.id_reporte = parseInt(resp);
        this.administadorService.crearRegistro(registroAIngresar).subscribe(resp2=>{
          console.log('resp2', resp2);
          this.notification.create(
            'success', 'Registro creado', 
            resp2.toString()
            // ''
          );
          this.cerrarCrearReporte();
        },
        error => {
          // console.log('error', error); 
          this.notification.create(
            'error', 'Error al crear registro', 'No es posible crear el registro, intente nuevamente'
          )
        });

        this.notification.create(
          'success', 'Reporte creado', 
          resp.toString()
          // ''
        );
      },
      error => {
        // console.log('error', error); 
        this.notification.create(
          'error', 'Error al crear reporte', 'No es posible crear el reporte, intente nuevamente'
        )
      });
    }
    else{
      this.notification.create(
            'error', 'Error en formulario', 'Es necesario rellenar el formulario completamente'
          )
    }
  }
 
  mostrarReportes(){
    this.isVisibleVerReportes = true;
    this.obtenerReportes();
  }

  okVerReportes(){
    this.isVisibleVerReportes = false;
  }

  eliminarReporte(id_reporte){
    const eliminar = {
      "id_reporte" : id_reporte
    }

    this.administadorService.eliminarReporte(eliminar).subscribe(resp=>{
      console.log('resp', resp);

      this.obtenerReportes();
    })
  }

  onChangeTipoReporte(ev){
    console.log('event', ev);
    this.tipoReporteSelected = ev
    
    if (ev == 1){
      this.obtenerReporteStock();
      this.mostrarDetalleVistaReporte = true;
    }
    else if (ev == 2){
      this.obtenerReporteClientesAtendidos();
      this.mostrarDetalleVistaReporte = true;
    }
    else if (ev ==3){
      this.obtenerReporteVistaPlatosConsumidos();
    }
    else if (ev==4){
      this.obtenerReporteReabastecimiento();
      this.mostrarDetalleVistaReporte = true;
    }
  }

  mostrarRegistros(){
    this.isVisibleSolicitudReabastecimiento = true;
    this.obtenerSolicitudesReabastecimiento()
  }

  okSolicitudReabastecimiento(){
    this.isVisibleSolicitudReabastecimiento = false;
  }

  mostrarRegistrosSolicitudesAprobadas(){
    this.isVisibleMostrarRegistrosAprobadas = true;
  }

  cerrarRegistrosSolicitudesAprobadas(){
    this.isVisibleMostrarRegistrosAprobadas = false;
  }

  contactarProveedores(reg){
    console.log('reg', reg);
    
    let registroNuevo = {
      descripcion : reg['descripcion'],
      id_estado_registro : 6, //estado_registro 2 = Recepcionar solicitud de reabastecimiento (bodega)
      id_modulo : 1,
      id_registro_padre : reg['id_registro'],
      id_tipo_registro : 1, //tipo_registro 1 = Solicitud de reabastecimiento
      id_usuario : this.usuarioLogeado,
      titulo_registro : reg['titulo_registro'],
      version : reg['version'] + 1,
      id_reporte : reg['reporte']['id_reporte']
    }
    let registroAntiguo = {
      "id_registro" : reg['id_registro']
    }
    let boletaAIngresar  : Boleta = {
      fechaAtencion : this.now.toLocaleDateString(),
      horaAtencion : this.now.toLocaleTimeString(),
      idUsuario : 'admin',
      rutCliente : -1,
      subtotal : 1
    }
    console.log('boletaAIngresar', boletaAIngresar);
    const instanciarBoleta : InstanciarBoleta ={
      boleta : boletaAIngresar
    }

    console.log('registroNuevo', registroNuevo);
    console.log('registroAntiguo', registroAntiguo);

    this.administadorService.crearRegistro(registroNuevo).subscribe(resp2 => {
      console.log('resp2', resp2);
      this.notification.create(
        'success', 'Registro creado',
        resp2.toString()
        // ''
      );

      // this.administadorService.actualizarUltimaVersionRegistro(registroAntiguo).subscribe(resp => {
      //   console.log('resp actualizarUltimaVersionRegistro()', resp);
      // })

      this.administadorService.instanciarBoleta(instanciarBoleta).subscribe(resp => {
        let boletaAPagar: Boleta = {
          fechaAtencion: this.now.toLocaleDateString(),
          horaAtencion: boletaAIngresar.horaAtencion,
          idUsuario: boletaAIngresar.idUsuario,
          rutCliente: boletaAIngresar.rutCliente,
          subtotal: boletaAIngresar.subtotal,
          descuentos: 0,
          extras: 0,
          horaEmision: this.now.toLocaleTimeString(),
          id_boleta: parseInt(resp),
          idEstadoBoleta: 5,
          idTipoPago: 1,
          total: boletaAIngresar.subtotal
        }
        console.log('boletaAPagar', boletaAPagar);

        const boleta = {
          "boleta": boletaAPagar
        }
        console.log('boleta', boleta);

        // this.administadorService.modificarBoleta(boleta).subscribe(resp => {
        //   console.log('resp modificarBoleta', resp);
        //   const transaccion = {
        //     "rut_cliente": boletaAPagar.rutCliente,
        //     "id_boleta": boletaAPagar.id_boleta,
        //     "valor": boletaAPagar.total,
        //     "id_cartera_pagos": "-3",
        //   }

        //   this.administadorService.crearTransaccion(transaccion).subscribe(resp3 => {
        //     console.log('resp', resp3);
        //   })
        // })
      })
    },
      error => {
        // console.log('error', error); 
        this.notification.create(
          'error', 'Error al crear registro', 'No es posible crear el registro, intente nuevamente'
        )
      });
    this.obtenerSolicitudReabastecimientoAprobada();
    this.obtenerSolicitudReabastecimientoModificada();
    this.cerrarRegistrosSolicitudesAprobadas();
  }
}