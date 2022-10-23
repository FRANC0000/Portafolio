import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Pedido, ProductoEnCarro } from 'src/app/interfaces/carrito-compras';
import { Plato, Producto, Receta, TipoPlato } from 'src/app/interfaces/cocina';
import { CocinaService } from './cocina.service';

@Component({
  selector: 'app-cocina',
  templateUrl: './cocina.component.html',
  styleUrls: ['./cocina.component.scss']
})
export class CocinaComponent implements OnInit {

  constructor(private router: Router, 
    private cocinaService : CocinaService,
    private fb: FormBuilder,
    private notification: NzNotificationService) { }

  listaPlatos : Plato[] = [];
  listaProductos : Producto[] = [];
  visibleDetallePlato = false;
  visibleDetalleProdcuto = false;
  platoSelected : Plato;
  productoSelected : Producto;
  isVisibleCrearReceta :boolean = false;
  validateFormCrearReceta!: FormGroup;
  listaRecetas : Receta[] = [];  
  validateFormModificarReceta!: FormGroup;
  isVisibleModificarReceta : boolean= false
  validateFormEliminarReceta!: FormGroup;
  isVisibleEliminarReceta : boolean= false
  isVisibleCrearPlato = false;
  validateFormCrearPlato!: FormGroup;
  listaTipoPlato: TipoPlato[] = [];
  validateFormEliminarPlato!: FormGroup;
  isVisibleEliminarPlato = false;
  validateFormModificarPlato!: FormGroup;
  isVisibleModificarPlato = false;
  tipoPlatoSelected: number;
  listaPedidosEnCola : Pedido[] = [];
  listaPedidosEnPreparacion : Pedido[] = [];
  listaPedidosParaEntregar : Pedido[] = [];
  listaPedidosEntregadosHoy : Pedido[] = [];

  ngOnInit() {
    this.obtenerPlatos();
    this.obtenerProductos();
    this.obtenerTipoPlato();

    this.actualizarPedidos();

    this.validateFormCrearReceta = new FormGroup({
      id_receta: new FormControl,
      comentario: new FormControl,
      complejidad: new FormControl,
      tiempo_preparacion: new FormControl
    })

    this.validateFormModificarReceta = new FormGroup({
      id_receta: new FormControl,
      comentario: new FormControl,
      complejidad: new FormControl,
      tiempo_preparacion: new FormControl,
      eliminado: new FormControl
    })

    this.validateFormEliminarReceta = new FormGroup({
      id_receta: new FormControl
    })

    this.validateFormCrearPlato = new FormGroup({
      id_plato : new FormControl,
      cantidad_personas_recomendadas: new FormControl,
      comentario : new FormControl,
      descripcion_plato: new FormControl,
      disponibilidad: new FormControl,
      nombre_plato: new FormControl,
      precio_plato: new FormControl,
      id_tipo_plato: new FormControl,
      eliminado: new FormControl
    })

    this.validateFormEliminarPlato = new FormGroup({
      id_plato : new FormControl
    })

    this.validateFormModificarPlato = new FormGroup({
      id_plato : new FormControl,
      cantidad_personas_recomendadas: new FormControl,
      comentario : new FormControl,
      descripcion_plato: new FormControl,
      disponibilidad: new FormControl,
      nombre_plato: new FormControl,
      precio_plato: new FormControl,
      id_tipo_plato: new FormControl,
      eliminado: new FormControl
    })
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
  }
  
  obtenerPlatos(){
    this.cocinaService.obtenerPlatos().subscribe(resp=>{
      this.listaPlatos = resp['plato'];
      console.log('listaPlatos', this.listaPlatos);
      
    });
  }

  obtenerProductos(){
    this.cocinaService.obtenerProductos().subscribe(resp=>{
      this.listaProductos = resp['productos'];
      console.log('listaProductos', this.listaProductos);
    })
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

  cerrarDrawerDetalleProducto(){
    this.visibleDetalleProdcuto = false;
  }

  cerrarDrawerDetallePlato(){
    this.visibleDetallePlato = false;
  }

  crearPlato() {
    this.isVisibleCrearPlato = true; //para abrir la ventana emergente, luego hay que cerrarla en otra funcion
    this.validateFormCrearPlato = this.fb.group({
      id_plato: [null, [Validators.required]],
      cantidad_personas_recomendadas: [null, [Validators.required]],
      comentario: [null, [Validators.required]],
      descripcion_plato: [null, [Validators.required]],
      disponibilidad: [null, [Validators.required]],
      nombre_plato: [null, [Validators.required]],
      precio_plato: [null, [Validators.required]],
      id_tipo_plato: [null, [Validators.required]],
      eliminado: [false, [Validators.required]]
    })

    console.log('Crear Plato');
  }

  crearReceta(){
    console.log('crearReceta');
    this.isVisibleCrearReceta = true;
    this.validateFormCrearReceta = this.fb.group({
      id_receta : [null, [Validators.required]],
      comentario :[null, [Validators.required]],
      complejidad :[null, [Validators.required]],
      tiempo_preparacion :[null, [Validators.required]]
    })
    
  }
  verPlatos(){
    console.log('verPlatos');
    
  }

  guardarCrearReceta(){
    console.log('guardarCrearReceta');
    console.log('valid ', this.validateFormCrearReceta.valid);
    if (this.validateFormCrearReceta.valid){
      console.log('formulario válido, usa el servicio de crear Receta');
      console.log('valores', this.validateFormCrearReceta.value);
      const unaReceta = {
        id_receta : this.validateFormCrearReceta.value.id_receta,
        comentario: this.validateFormCrearReceta.value.comentario,
        complejidad : this.validateFormCrearReceta.value.complejidad,
        tiempoPreparacion : this.validateFormCrearReceta.value.tiempo_preparacion
      }
      console.log('UnaReceta', unaReceta);
      this.cocinaService.crearReceta(unaReceta).subscribe(resp => {
        console.log('respuesta a mi servicio crearReceta', resp);
        // this.obtenerRecetas();
        this.isVisibleCrearReceta = false;
      })
      
    }
    else{
      console.log('formulario no válido.');
      
    }
    
  }

  cerrarCrearReceta(){
    this.isVisibleCrearReceta = false;
  }

  obtenerRecetas(){
    this.listaRecetas = [];
    this.cocinaService.obtenerRecetas().subscribe(resp => {
      // console.log('resp', resp);
      for (let unaReceta of resp["listado_recetas"]){
        // console.log('unaReceta', unareceta);
        const receta : Receta = {
          id_receta : unaReceta.id_receta,
          comentario : unaReceta.comentario,
          complejidad : unaReceta.complejidad,
          tiempoPreparacion : unaReceta.tiempo_preparacion,
          eliminado : unaReceta.eliminado
          
        }
        // console.log('plato', plato);
        this.listaRecetas.push(receta);
        console.log('listaRecetas', this.listaRecetas);
        this.listaRecetas.sort(function(a,b){
          if(a.id_receta < b.id_receta){
            return -1
          }
          if (a.id_receta > b.id_receta){
            return 1
          }
          return 0;
        })
      }

    })
  }

  guardarModificarReceta(){
    console.log('guardarModificarReceta');
    console.log('valid ', this.validateFormModificarReceta.valid);
    if (this.validateFormModificarReceta.valid){
      console.log('formulario válido, usa el servicio de modificar Receta');
      console.log('valores', this.validateFormModificarReceta.value);
      const unaReceta = {
        id_receta : this.validateFormModificarReceta.value.id_receta,
        comentario: this.validateFormModificarReceta.value.comentario,
        complejidad : this.validateFormModificarReceta.value.complejidad,
        tiempoPreparacion : this.validateFormModificarReceta.value.tiempo_preparacion,
        eliminado : this.validateFormModificarReceta.value.eliminado
      }
      console.log('UnaReceta', unaReceta);
      this.cocinaService.modificarReceta(unaReceta).subscribe(resp => {
        console.log('respuesta a mi servicio modificarReceta', resp);
        // this.obtenerRecetas();
        this.isVisibleModificarReceta = false;
        
      })
      
      
    }
    else{
      console.log('formulario no válido.');
    }
  }
  cerrarModificarReceta(){
    this.isVisibleModificarReceta = false;
  }

  modificarReceta(){
    console.log('modificarReceta');
    this.isVisibleModificarReceta= true;
    this.validateFormModificarReceta = this.fb.group({
      id_receta : [null, [Validators.required]],
      comentario :[null, [Validators.required]],
      complejidad :[null, [Validators.required]],
      tiempo_preparacion :[null, [Validators.required]],
      eliminado :[null, [Validators.required]]
    })
  }
  
  guardarEliminarReceta(){
    // this.isVisibleCrearMesa = false;
   console.log('validateFormEliminarReceta', this.validateFormEliminarReceta.value);
   if (this.validateFormEliminarReceta.valid){
     console.log('Formulario válido');
     var valores = this.validateFormEliminarReceta.value;

     var recetaAEliminar = {
       id_receta : valores.id_receta
       
     }

     this.cocinaService.eliminarReceta(recetaAEliminar).subscribe(resp =>{
       console.log('resp', resp);
       if (resp.includes('No se puede eliminar la receta')){
         this.notification.create(
           'error', 'Error al eliminar la receta', resp
         )
       }
       else if (resp.includes('correctamente')){
         this.notification.create(
           'success', 'Receta eliminada', resp
         )
         this.isVisibleEliminarReceta = false;
       }
     });
   }
   else{
     console.log('Receta no eliminada', this.validateFormEliminarReceta.value);

     this.notification.create(
       'error', 'Error al eliminar receta', 'Debes rellenar todos los campos'
     )
   }
 }

  cerrarEliminarReceta() {
    this.isVisibleEliminarReceta = false;
  }

  eliminarReceta() {
    console.log('eliminarReceta');
    this.isVisibleEliminarReceta = true;
    this.validateFormEliminarReceta = this.fb.group({
      id_receta: [null, [Validators.required]],

    })
  }

  guardarCrearPlato(){
    console.log('Servicio crear plato');
    this.enviarFormularioCrearPlato();
    var valores = this.validateFormCrearPlato.value

    if (this.validateFormCrearPlato.valid){
      var platoACrear : Plato = {
        id_plato : valores.id_plato,
        cantidad_personas_recomendadas: valores.cantidad_personas_recomendadas,
        comentario: valores.comentario,
        descripcion_plato: valores.descripcion_plato,
        disponibilidad: valores.disponibilidad,
        nombre_plato: valores.nombre_plato,
        precio_plato: valores.precio_plato,
        id_tipo_plato: valores.id_tipo_plato,
        eliminado: valores.eliminado
      }

      console.log('platoACrear: ', platoACrear);
      this.cocinaService.crearPlato(platoACrear).subscribe(resp=>{
        console.log('resp:', resp);
        this.cerrarCrearPlato();
        this.notification.create(
          'success', 'Plato creado', resp
        );
        this.obtenerPlatos();
      },
      error => {
        // console.log('error', error); 
        this.notification.create(
          'error', 'Error al crear plato', 'No es posible crear el plato, lo sentimos'
        )
      });
    }
  }

  enviarFormularioCrearPlato(){
    if (this.validateFormCrearPlato.valid){
      console.log('Formulario válido', this.validateFormCrearPlato.value);      

    } else {
      console.log('Formulario no válido?', this.validateFormCrearPlato.value);

      this.notification.create(
        'error', 'Error al crear plato', 'Debes rellenar todos los campos'
      )

      Object.values(this.validateFormCrearPlato.controls).forEach(control => {
        // console.log('control', control);
        if (control.invalid) {
          console.log('control inválido');          
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf : true});
        }
      });
    }
  }

  cerrarCrearPlato(){
    this.isVisibleCrearPlato = false;
    this.validateFormCrearPlato.reset();
  }

  obtenerTipoPlato(){
    this.listaTipoPlato = []
    this.cocinaService.obtenerTipoPlato().subscribe(resp => {
      // console.log("resp",resp);
      let listaTipoPlato = resp["list_tipoplato"]
      for (let tipo_plato of listaTipoPlato){
        const unTipoPlato : TipoPlato = {
          id_tipo_plato: tipo_plato.id_tipo_plato,
          descripcion_tipo_plato: tipo_plato.descripcion_tipo_plato,
          nombre_tipo_plato: tipo_plato.nombre_tipo_plato
        }
        this.listaTipoPlato.push(unTipoPlato);
      }
      console.log('listaTipoPlato', this.listaTipoPlato);
      
    })
  }

  eliminarPlato(){
    this.isVisibleEliminarPlato = true; //para abrir la ventana emergente, luego hay que cerrarla en otra funcion
        this.validateFormEliminarPlato = this.fb.group({
          id_plato : [null, [Validators.required]]
        })
  
      console.log('Eliminar Plato');
  }

  cerrarEliminarPlato(){
    this.isVisibleEliminarPlato = false;
  }

  guardarEliminarPlato(){
    console.log('validateFormEliminarPlato', this.validateFormEliminarPlato.value);
      if (this.validateFormEliminarPlato.valid){
        console.log('Formulario válido');
        var valores = this.validateFormEliminarPlato.value;
  
        var platoAEliminar = {
          id_plato : valores.id_plato
        }
        // Validación mesa reservada: obtener reserva activa por Id_mesa
        this.cocinaService.eliminarPlato(platoAEliminar).subscribe(resp =>{
          console.log('resp', resp);
          if (resp.includes('No se puede eliminar este plato')){
            this.notification.create(
              'error', 'Error al eliminar plato', resp
            )
          }
          else if (resp.includes('Se eliminó el plato correctamente')){
            this.notification.create(
              'success', 'Plato eliminado', resp
            )
            this.obtenerPlatos();
            this.isVisibleEliminarPlato = false;
          }
        });
      }
      else{
        console.log('Formulario no válido', this.validateFormEliminarPlato.value);
  
        this.notification.create(
          'error', 'Error al eliminar el plato', 'Debes rellenar todos los campos'
        )
      }
  }

  guardarModificarPlato(){
    console.log('validateFormModificarPlato', this.validateFormModificarPlato.value);
    if (this.validateFormModificarPlato.valid){
      console.log('Formulario válido');
      var valores = this.validateFormModificarPlato.value;
      /* console.log("tp selelcted",this.tipoPlatoSelected) */

      var platoAActualizar : Plato = {
        id_plato : valores.id_plato,
        cantidad_personas_recomendadas : valores.cantidad_personas_recomendadas,
        comentario : valores.comentario,
        id_tipo_plato : this.tipoPlatoSelected,
        nombre_plato : valores.nombre_plato,
        precio_plato : valores.precio_plato, 
        descripcion_plato : valores.descripcion_plato,  
        disponibilidad : valores.disponibilidad,
        eliminado : valores.eliminado }

        console.log("paact", platoAActualizar)

       this.cocinaService.modificarPlato(platoAActualizar).subscribe(resp =>{
        console.log('resp', resp);
        if (resp.includes('No existe plato asociado a este ID')){
          this.notification.create(
            'error', 'Error al actualizar plato', resp
          )
        }
        else if (resp.includes('modificado satisfactoriamente')){
          this.notification.create(
            'success', 'Plato actualizado', resp
          )
          this.obtenerPlatos();
          this.isVisibleModificarPlato = false;
        }
      }); 
    }
    else{
      console.log('Formulario no válido', this.validateFormModificarPlato.value);
      
      this.notification.create(
        'error', 'Error al actualizar plato', 'Debes rellenar todos los campos'
      )
    }
  }

  actualizarPlato(){
    this.isVisibleModificarPlato = true;
    this.validateFormModificarPlato = this.fb.group({
      id_plato : [null,  [Validators.required]],
      cantidad_personas_recomendadas:[null, [Validators.required]],
      comentario :[null, [Validators.required]],
      descripcion_plato:[null, [Validators.required]],
      disponibilidad:[null, [Validators.required]],
      nombre_plato:[null, [Validators.required]],
      precio_plato:[null, [Validators.required]],
      id_tipo_plato:[null, [Validators.required]],
      eliminado:[false, [Validators.required]]
    })
  }

  cerrarModificarPlato(){
    this.isVisibleModificarPlato = false;
  }

  obtenerPedidosEnCola(){
    this.listaPedidosEnCola = []
    this.cocinaService.obtenerPedidosEnCola().subscribe(resp =>{
      // console.log('resp', resp);
      let listaPedidosResp = resp['pedidos']
      // console.log('listaPedidosResp', listaPedidosResp);

      listaPedidosResp.forEach(pedido => {
        let carritoDeUnPedido : ProductoEnCarro[] = [];

        pedido.platos_del_pedido.forEach(plato => {
          const unPlatoPedido : Plato = {
            cantidad_personas_recomendadas : plato.cantidad_personas_recomendadas,
            comentario : plato.comentario_plato,
            descripcion_plato : plato.descripcion_plato,
            disponibilidad : plato.disponibilidad_plato,
            id_plato : plato.id_plato,
            id_tipo_plato : plato.id_tipo_plato,
            nombre_plato : plato.nombre_plato,
            precio_plato : plato.precio_plato
          }

          const platoEnCarro : ProductoEnCarro = {
            cantidad : plato.cantidad_platos_en_pedido,
            esPlato : true,
            esProducto : false,
            valorUnitario : plato.precio_plato,
            plato : unPlatoPedido
          }

          carritoDeUnPedido.push(platoEnCarro);
        })

        pedido.productos_del_pedido.forEach(producto => {
          const unProductoPedido : Producto = {
            comentario : producto.comentario_producto,
            fecha_ingreso_producto : producto.fecha_ingreso_producto,
            fecha_vencimiento : producto.fecha_vencimiento_producto,
            id_producto : producto.id_producto,
            id_tipo_producto : producto.id_tipo_producto,
            medida_producto : producto.medida_producto,
            nombre_producto : producto.nombre_producto,
            stock_producto : producto.stock_producto,
            valor_unitario : producto.valor_unitario_producto
          }

          const productoEnCarro : ProductoEnCarro = {
            cantidad: producto.cantidad_productos_en_pedido,
            esPlato : false,
            esProducto : true,
            valorUnitario : producto.valor_unitario_producto,
            producto : unProductoPedido
          }
          carritoDeUnPedido.push(productoEnCarro);
        })

        const unPedido : Pedido ={
          fechaIngreso : pedido.fecha_ingreso,
          idEstadoIinstancia: pedido.id_estado_instancia,
          idMesa: pedido.id_mesa,
          rutCliente : pedido.id_cliente,
          idBoleta : pedido.id_boleta,
          idPedido : pedido.id_pedido,
          nombreEstadoInstancia : pedido.nombre_estado_instancia,
          subtotal : pedido.subtotal,
          carritoProductos : carritoDeUnPedido
        }

        // console.log('unPedido', unPedido);
        this.listaPedidosEnCola.push(unPedido);
      });
      console.log('listaPedidosEnCola', this.listaPedidosEnCola);
    })
  }

  verDetallePedidoEnCola(pedido){
    console.log('pedido verDetallePedidoEnCola', pedido);
    
  }

  moverPedidoAEnPreparacion(pedido){
    console.log('pedido moverPedidoAEnPreparacion', pedido);
    const modificarInstanciaPedido = {
      "id_pedido" : pedido.idPedido,
      "id_estado_instancia" : 2
    }
    this.cocinaService.modificarInstanciaPedido(modificarInstanciaPedido).subscribe(resp => {
      console.log('resp', resp);
      if (resp.includes('actualizada satisfactoriamente')){
        this.actualizarPedidos();
      }
    })
  }
  
  moverPedidoAParaEntregar(pedido){
    console.log('pedido moverPedidoAParaEntregar', pedido);
    const modificarInstanciaPedido = {
      "id_pedido" : pedido.idPedido,
      "id_estado_instancia" : 3
    }
    this.cocinaService.modificarInstanciaPedido(modificarInstanciaPedido).subscribe(resp => {
      console.log('resp', resp);
      if (resp.includes('actualizada satisfactoriamente')){
        this.actualizarPedidos();
      }
    })
  }

  moverPedidoAEntregado(pedido){
    console.log('pedido moverPedidoAEntregado', pedido);
    const modificarInstanciaPedido = {
      "id_pedido" : pedido.idPedido,
      "id_estado_instancia" : 4
    }
    this.cocinaService.modificarInstanciaPedido(modificarInstanciaPedido).subscribe(resp => {
      console.log('resp', resp);
      if (resp.includes('actualizada satisfactoriamente')){
        this.actualizarPedidos();
      }
    })
  }

  actualizarPedidos(){
    this.obtenerPedidosEnCola();
    this.obtenerPedidosEnPreparacion();
    this.obtenerPedidosParaEntregar();
    this.obtenerPedidosEntregadosHoy();
  }

  obtenerPedidosEnPreparacion(){
    this.listaPedidosEnPreparacion = []
    this.cocinaService.obtenerPedidosEnPreparacion().subscribe(resp =>{
      // console.log('resp', resp);
      let listaPedidosResp = resp['pedidos']
      // console.log('listaPedidosResp', listaPedidosResp);

      listaPedidosResp.forEach(pedido => {
        let carritoDeUnPedido : ProductoEnCarro[] = [];

        pedido.platos_del_pedido.forEach(plato => {
          const unPlatoPedido : Plato = {
            cantidad_personas_recomendadas : plato.cantidad_personas_recomendadas,
            comentario : plato.comentario_plato,
            descripcion_plato : plato.descripcion_plato,
            disponibilidad : plato.disponibilidad_plato,
            id_plato : plato.id_plato,
            id_tipo_plato : plato.id_tipo_plato,
            nombre_plato : plato.nombre_plato,
            precio_plato : plato.precio_plato
          }

          const platoEnCarro : ProductoEnCarro = {
            cantidad : plato.cantidad_platos_en_pedido,
            esPlato : true,
            esProducto : false,
            valorUnitario : plato.precio_plato,
            plato : unPlatoPedido
          }

          carritoDeUnPedido.push(platoEnCarro);
        })

        pedido.productos_del_pedido.forEach(producto => {
          const unProductoPedido : Producto = {
            comentario : producto.comentario_producto,
            fecha_ingreso_producto : producto.fecha_ingreso_producto,
            fecha_vencimiento : producto.fecha_vencimiento_producto,
            id_producto : producto.id_producto,
            id_tipo_producto : producto.id_tipo_producto,
            medida_producto : producto.medida_producto,
            nombre_producto : producto.nombre_producto,
            stock_producto : producto.stock_producto,
            valor_unitario : producto.valor_unitario_producto
          }

          const productoEnCarro : ProductoEnCarro = {
            cantidad: producto.cantidad_productos_en_pedido,
            esPlato : false,
            esProducto : true,
            valorUnitario : producto.valor_unitario_producto,
            producto : unProductoPedido
          }
          carritoDeUnPedido.push(productoEnCarro);
        })

        const unPedido : Pedido ={
          fechaIngreso : pedido.fecha_ingreso,
          idEstadoIinstancia: pedido.id_estado_instancia,
          idMesa: pedido.id_mesa,
          rutCliente : pedido.id_cliente,
          idBoleta : pedido.id_boleta,
          idPedido : pedido.id_pedido,
          nombreEstadoInstancia : pedido.nombre_estado_instancia,
          subtotal : pedido.subtotal,
          carritoProductos : carritoDeUnPedido
        }

        // console.log('unPedido', unPedido);
        this.listaPedidosEnPreparacion.push(unPedido);
      });
      console.log('listaPedidosEnPreparacion', this.listaPedidosEnPreparacion);
    })
  }

  obtenerPedidosParaEntregar(){
    this.listaPedidosParaEntregar = []
    this.cocinaService.obtenerPedidosParaEntregar().subscribe(resp =>{
      // console.log('resp', resp);
      let listaPedidosResp = resp['pedidos']
      // console.log('listaPedidosResp', listaPedidosResp);

      listaPedidosResp.forEach(pedido => {
        let carritoDeUnPedido : ProductoEnCarro[] = [];

        pedido.platos_del_pedido.forEach(plato => {
          const unPlatoPedido : Plato = {
            cantidad_personas_recomendadas : plato.cantidad_personas_recomendadas,
            comentario : plato.comentario_plato,
            descripcion_plato : plato.descripcion_plato,
            disponibilidad : plato.disponibilidad_plato,
            id_plato : plato.id_plato,
            id_tipo_plato : plato.id_tipo_plato,
            nombre_plato : plato.nombre_plato,
            precio_plato : plato.precio_plato
          }

          const platoEnCarro : ProductoEnCarro = {
            cantidad : plato.cantidad_platos_en_pedido,
            esPlato : true,
            esProducto : false,
            valorUnitario : plato.precio_plato,
            plato : unPlatoPedido
          }

          carritoDeUnPedido.push(platoEnCarro);
        })

        pedido.productos_del_pedido.forEach(producto => {
          const unProductoPedido : Producto = {
            comentario : producto.comentario_producto,
            fecha_ingreso_producto : producto.fecha_ingreso_producto,
            fecha_vencimiento : producto.fecha_vencimiento_producto,
            id_producto : producto.id_producto,
            id_tipo_producto : producto.id_tipo_producto,
            medida_producto : producto.medida_producto,
            nombre_producto : producto.nombre_producto,
            stock_producto : producto.stock_producto,
            valor_unitario : producto.valor_unitario_producto
          }

          const productoEnCarro : ProductoEnCarro = {
            cantidad: producto.cantidad_productos_en_pedido,
            esPlato : false,
            esProducto : true,
            valorUnitario : producto.valor_unitario_producto,
            producto : unProductoPedido
          }
          carritoDeUnPedido.push(productoEnCarro);
        })

        const unPedido : Pedido ={
          fechaIngreso : pedido.fecha_ingreso,
          idEstadoIinstancia: pedido.id_estado_instancia,
          idMesa: pedido.id_mesa,
          rutCliente : pedido.id_cliente,
          idBoleta : pedido.id_boleta,
          idPedido : pedido.id_pedido,
          nombreEstadoInstancia : pedido.nombre_estado_instancia,
          subtotal : pedido.subtotal,
          carritoProductos : carritoDeUnPedido
        }

        // console.log('unPedido', unPedido);
        this.listaPedidosParaEntregar.push(unPedido);
      });
      console.log('listaPedidosParaEntregar', this.listaPedidosParaEntregar);
    })
  }

  obtenerPedidosEntregadosHoy(){
    this.listaPedidosEntregadosHoy = []
    this.cocinaService.obtenerPedidosEntregadosHoy().subscribe(resp =>{
      // console.log('resp', resp);
      let listaPedidosResp = resp['pedidos']
      // console.log('listaPedidosResp', listaPedidosResp);

      listaPedidosResp.forEach(pedido => {
        let carritoDeUnPedido : ProductoEnCarro[] = [];

        pedido.platos_del_pedido.forEach(plato => {
          const unPlatoPedido : Plato = {
            cantidad_personas_recomendadas : plato.cantidad_personas_recomendadas,
            comentario : plato.comentario_plato,
            descripcion_plato : plato.descripcion_plato,
            disponibilidad : plato.disponibilidad_plato,
            id_plato : plato.id_plato,
            id_tipo_plato : plato.id_tipo_plato,
            nombre_plato : plato.nombre_plato,
            precio_plato : plato.precio_plato
          }

          const platoEnCarro : ProductoEnCarro = {
            cantidad : plato.cantidad_platos_en_pedido,
            esPlato : true,
            esProducto : false,
            valorUnitario : plato.precio_plato,
            plato : unPlatoPedido
          }

          carritoDeUnPedido.push(platoEnCarro);
        })

        pedido.productos_del_pedido.forEach(producto => {
          const unProductoPedido : Producto = {
            comentario : producto.comentario_producto,
            fecha_ingreso_producto : producto.fecha_ingreso_producto,
            fecha_vencimiento : producto.fecha_vencimiento_producto,
            id_producto : producto.id_producto,
            id_tipo_producto : producto.id_tipo_producto,
            medida_producto : producto.medida_producto,
            nombre_producto : producto.nombre_producto,
            stock_producto : producto.stock_producto,
            valor_unitario : producto.valor_unitario_producto
          }

          const productoEnCarro : ProductoEnCarro = {
            cantidad: producto.cantidad_productos_en_pedido,
            esPlato : false,
            esProducto : true,
            valorUnitario : producto.valor_unitario_producto,
            producto : unProductoPedido
          }
          carritoDeUnPedido.push(productoEnCarro);
        })

        const unPedido : Pedido ={
          fechaIngreso : pedido.fecha_ingreso,
          idEstadoIinstancia: pedido.id_estado_instancia,
          idMesa: pedido.id_mesa,
          rutCliente : pedido.id_cliente,
          idBoleta : pedido.id_boleta,
          idPedido : pedido.id_pedido,
          nombreEstadoInstancia : pedido.nombre_estado_instancia,
          subtotal : pedido.subtotal,
          carritoProductos : carritoDeUnPedido
        }

        // console.log('unPedido', unPedido);
        this.listaPedidosEntregadosHoy.push(unPedido);
      });
      console.log('listaPedidosEntregadosHoy', this.listaPedidosEntregadosHoy);
    })
  }
}