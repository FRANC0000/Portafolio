import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Pedido, ProductoEnCarro } from 'src/app/interfaces/carrito-compras';
import { Plato, Producto, ProductosReceta, Receta, TipoPlato, TipoProducto } from 'src/app/interfaces/cocina';
import { isObject } from 'util';
import { LoginComponent } from '../login/login.component';
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

  usuarioLogeado :string = localStorage.getItem('id_usuario');
  rolUsuarioLogeado : string = localStorage.getItem('rol');

  listaPlatos : Plato[] = [];
  listaProductos : Producto[] = [];
  visibleDetallePlato = false;
  visibleDetalleProdcuto = false;
  visibleDetalleReceta = false;
  platoSelected : Plato;
  productoSelected : Producto;
  recetaSelected;
  isVisibleCrearReceta :boolean = false;
  validateFormCrearReceta!: FormGroup;
  listaRecetas : Receta[] = [];
  validateFormModificarReceta!: FormGroup;
  isVisibleModificarReceta : boolean= false
  validateFormEliminarReceta!: FormGroup;
  isVisibleEliminarReceta : boolean= false
  isVisibleCrearPlato = false;
  validateFormCrearPlato!: FormGroup;
  validateFormCrearProducto!: FormGroup;
  listaTipoPlato: TipoPlato[] = [];
  listaTipoProducto: TipoProducto[] = [];
  validateFormEliminarPlato!: FormGroup;
  isVisibleEliminarPlato = false;
  validateFormModificarPlato!: FormGroup;
  isVisibleModificarPlato = false;
  tipoPlatoSelected: number;
  listaPedidosEnCola : Pedido[] = [];
  listaPedidosEnPreparacion : Pedido[] = [];
  listaPedidosParaEntregar : Pedido[] = [];
  listaPedidosEntregadosHoy : Pedido[] = [];
  formDataPlato = new FormData();
  formDataProducto = new FormData();
  now = new Date();
  isVisibleCrearProducto = false;
  isVisibleModificarProducto = false;
  validateFormModificarProducto : FormGroup;
  listProductosReceta : ProductosReceta[] = [];
  validateFormCrearProductosReceta : FormGroup;
  isVisibleCrearProductoReceta = false;
  cantidadProductoReceta : number = 1;

  ngOnInit() {
    console.log('usuarioLogeado', this.usuarioLogeado);
    console.log('rolUsuarioLogeado', this.rolUsuarioLogeado);
    this.obtenerPlatos();
    this.obtenerProductos();
    this.obtenerTipoPlato();
    this.obtenerTipoProducto();
    this.obtenerRecetas();

    this.actualizarPedidos();

    this.validateFormCrearReceta = new FormGroup({
      comentario: new FormControl,
      complejidad: new FormControl,
      tiempo_preparacion: new FormControl,
      titulo_receta: new FormControl
    })

    this.validateFormModificarReceta = new FormGroup({
      comentario: new FormControl,
      complejidad: new FormControl,
      tiempo_preparacion: new FormControl,
      titulo_receta : new FormControl
    })

    this.validateFormEliminarReceta = new FormGroup({
      id_receta: new FormControl
    })

    this.validateFormCrearPlato = new FormGroup({
      cantidad_personas_recomendadas: new FormControl,
      comentario : new FormControl,
      descripcion_plato: new FormControl,
      disponibilidad: new FormControl,
      nombre_plato: new FormControl,
      precio_plato: new FormControl,
      id_tipo_plato: new FormControl,
    })

    this.validateFormCrearProducto = new FormGroup({
      comentario: new FormControl,
      fecha_ingreso_producto : new FormControl,
      fecha_vencimiento: new FormControl,
      medida_producto: new FormControl,
      nombre_producto: new FormControl,
      stock_producto: new FormControl,
      valor_unitario: new FormControl,
      tipo_producto : new FormControl
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

    this.validateFormModificarProducto = new FormGroup({
      id_producto : new FormControl,
      comentario : new FormControl,
      fecha_ingreso_producto : new FormControl,
      fecha_vencimiento : new FormControl,
      medida_producto : new FormControl,
      nombre_producto : new FormControl,
      stock_producto : new FormControl,
      valor_unitario : new FormControl,
      tipo_producto : new FormControl
    })

    this.validateFormCrearProductosReceta = new FormGroup({
      id_producto : new FormControl,
      nombre_producto : new FormControl,
      cantidad : new FormControl,
      comentario : new FormControl,
    })
  }

  cerrarSesion(){
    this.router.navigate(['/login'])
    localStorage.clear();
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
    this.isVisibleModificarProducto = false;
    this.validateFormModificarProducto = null;
  }

  cerrarDrawerDetalleReceta(){
    this.visibleDetalleReceta = false;
    this.isVisibleModificarReceta = false;
  }

  cerrarDrawerDetallePlato(){
    this.visibleDetallePlato = false;
    this.isVisibleModificarPlato = false;
    this.validateFormModificarPlato = null;
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

    console.log('Crear Plato');
    this.crearReceta();
  }

  crearReceta(){
    console.log('crearReceta');
    this.isVisibleCrearReceta = true;
    this.validateFormCrearReceta = this.fb.group({
      comentario :[null, [Validators.required]],
      complejidad :[null, [Validators.required]],
      tiempo_preparacion :[null, [Validators.required]],
      titulo_receta :[null, [Validators.required]],
    })
  }
  verPlatos(){
    console.log('verPlatos');
  }

  guardarCrearReceta(id_plato){
    console.log('guardarCrearReceta');
    console.log(this.validateFormCrearReceta);
    
    console.log('valid ', this.validateFormCrearReceta.valid);
    if (this.validateFormCrearReceta.valid && this.listProductosReceta.length > 0){
      console.log('formulario válido, usa el servicio de crear Receta');
      console.log('valores', this.validateFormCrearReceta.value);
      console.log('listProductosReceta', this.listProductosReceta);
      
      const unaReceta = {
        comentario: this.validateFormCrearReceta.value.comentario,
        complejidad : this.validateFormCrearReceta.value.complejidad,
        tiempoPreparacion : this.validateFormCrearReceta.value.tiempo_preparacion,
        productosEnReceta : this.listProductosReceta,
        id_plato : id_plato,
        titulo_receta : this.validateFormCrearReceta.value.titulo_receta
      }
      console.log('UnaReceta', unaReceta);
      this.cocinaService.crearReceta(unaReceta).subscribe(resp => {
        console.log('respuesta a mi servicio crearReceta', resp);
        this.obtenerRecetas();
        this.isVisibleCrearReceta = false;
        this.cerrarCrearPlato();
        this.cerrarCrearReceta();
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

  cerrarCrearReceta(){
    this.isVisibleCrearReceta = false;
    this.validateFormCrearReceta.reset();
    this.listProductosReceta = []
  }

  obtenerRecetas(){
    this.listaRecetas = [];
    this.cocinaService.obtenerRecetas().subscribe(resp => {

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
        tiempoPreparacion : this.validateFormModificarReceta.value.tiempo_preparacion,
        titulo_receta : this.validateFormModificarReceta.value.titulo_receta
      }
      console.log('UnaReceta', unaReceta);
      this.cocinaService.modificarReceta(unaReceta).subscribe(resp => {
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
  cerrarModificarReceta(){
    this.isVisibleModificarReceta = false;
  }

  modificarReceta(receta){
    console.log('modificarReceta');
    this.isVisibleModificarReceta= true;
    this.validateFormModificarReceta = this.fb.group({
      comentario :[receta.comentario, [Validators.required]],
      complejidad :[receta.complejidad, [Validators.required]],
      tiempo_preparacion :[receta.tiempo_preparacion.toString(), [Validators.required]],
      titulo_receta : [receta.titulo_receta, [Validators.required]]
    })
  }
  
  guardarEliminarReceta(id_receta){
    var recetaAEliminar = {
      id_receta: id_receta
    }
    this.cocinaService.eliminarReceta(recetaAEliminar).subscribe(resp => {
      console.log('resp', resp);
      if (resp.includes('No se puede eliminar la receta')) {
        this.notification.create(
          'error', 'Error al eliminar la receta', resp
        )
      }
      else if (resp.includes('correctamente')) {
        this.notification.create(
          'success', 'Receta eliminada', resp
        )
        this.isVisibleEliminarReceta = false;
        this.cerrarDrawerDetalleReceta();
        setTimeout(() => {
          this.obtenerRecetas();
       }, 1500);
      }
    });
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
        cantidad_personas_recomendadas: valores.cantidad_personas_recomendadas,
        comentario: valores.comentario,
        descripcion_plato: valores.descripcion_plato,
        disponibilidad: valores.disponibilidad,
        nombre_plato: valores.nombre_plato,
        precio_plato: valores.precio_plato,
        id_tipo_plato: valores.id_tipo_plato
      }

      console.log('platoACrear: ', platoACrear);
      this.cocinaService.crearPlato(platoACrear).subscribe(resp=>{
        console.log('resp:', resp);
        this.notification.create(
          'success', 'Plato creado', resp
        );

        this.guardarCrearReceta(resp);

        this.formDataPlato.append("id_plato", resp);
        this.cocinaService.subirImagenPlato(this.formDataPlato).subscribe(resp=>{
        console.log(resp)
        })

        setTimeout(() => {
          this.obtenerPlatos();
        }, 1500);
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
  
  obtenerTipoProducto(){
    this.listaTipoProducto = []
    this.cocinaService.obtenerTipoProducto().subscribe(resp => {
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

  eliminarPlato(){
    this.validateFormEliminarPlato = this.fb.group({
      id_plato: [null, [Validators.required]]
    })

    console.log('Eliminar Plato');
  }

  cerrarEliminarPlato(){
    this.isVisibleEliminarPlato = false;
  }

  guardarEliminarPlato(id_plato){
    var platoAEliminar = {
      id_plato: id_plato
    }
    // Validación mesa reservada: obtener reserva activa por Id_mesa
    this.cocinaService.eliminarPlato(platoAEliminar).subscribe(resp => {
      console.log('resp', resp);
      if (resp.includes('No se puede eliminar este plato')) {
        this.notification.create(
          'error', 'Error al eliminar plato', resp
        )
      }
      else if (resp.includes('Se eliminó el plato correctamente')) {
        this.notification.create(
          'success', 'Plato eliminado', resp
        )
        this.cerrarEliminarPlato();
        this.cerrarDrawerDetallePlato();
        setTimeout(() => {
          this.obtenerPlatos();
        }, 1500);
      }
    });
  }

  guardarModificarPlato(id_plato){
    console.log('validateFormModificarPlato', this.validateFormModificarPlato.value);
    if (this.validateFormModificarPlato.valid){
      console.log('Formulario válido');
      var valores = this.validateFormModificarPlato.value;
      console.log('valores', valores);
      
      /* console.log("tp selelcted",this.tipoPlatoSelected) */

      var platoAActualizar : Plato = {
        id_plato : id_plato,
        cantidad_personas_recomendadas : valores.cantidad_personas_recomendadas,
        comentario : valores.comentario,
        id_tipo_plato : valores.id_tipo_plato,
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
          this.formDataPlato.append("id_plato", id_plato);
          this.cocinaService.subirImagenPlato(this.formDataPlato).subscribe(resp=>{
            console.log(resp)
          })
          this.cerrarModificarPlato();
          this.cerrarDrawerDetallePlato();
          setTimeout(() => {
            this.obtenerPlatos();
          }, 1500);
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

  actualizarPlato(plato){
    this.formDataPlato = new FormData();
    console.log(plato);
    this.isVisibleModificarPlato = true;
    this.validateFormModificarPlato = this.fb.group({
      cantidad_personas_recomendadas:[plato.cantidad_personas_recomendadas, [Validators.required]],
      comentario :[plato.comentario, [Validators.required]],
      descripcion_plato:[plato.descripcion_plato, [Validators.required]],
      disponibilidad:[plato.disponibilidad, [Validators.required]],
      nombre_plato:[plato.nombre_plato, [Validators.required]],
      precio_plato:[plato.precio_plato, [Validators.required]],
      id_tipo_plato:[plato.id_tipo_plato, [Validators.required]],
      eliminado:[plato.eliminado, [Validators.required]]
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
          let rec : Receta[] = [];
          let recetaSelecccionada = []
          if (plato.recetas_pedidas != undefined){
            let recetaSelecccionada = JSON.parse(plato.recetas_pedidas)
            // console.log('recetaSelecccionada',recetaSelecccionada);
            for (let receta of recetaSelecccionada) {
              let r = this.listaRecetas.filter(r => {
                return r.id_receta === receta
              })
              // console.log('r', r);
              
              rec.push(r[0])
              // console.log('recetaSelecccionada', recetaSelecccionada);
            }
          }
          // console.log('rec', rec);

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
            plato : unPlatoPedido,
            recetaSeleccionada : recetaSelecccionada,
            objetoRecetaSeleccionada : rec
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
      this.listaPedidosEnCola.sort((a,b) => {
        if (a.carritoProductos.length < b.carritoProductos.length){
          console.log('a < b');
          this.listaPedidosEnCola.forEach(pe => {
            pe.carritoProductos.forEach((it, index)=> {
              if (it.objetoRecetaSeleccionada !=undefined){
                if (a.carritoProductos[index].objetoRecetaSeleccionada.length < b.carritoProductos[index].objetoRecetaSeleccionada.length){
                  it.objetoRecetaSeleccionada.forEach((re, index2) => {
                    if(a.carritoProductos[index].objetoRecetaSeleccionada[index2].tiempoPreparacion < b.carritoProductos[index].objetoRecetaSeleccionada[index2].tiempoPreparacion){
                      return 1
                    }
                    return -1
                  })
                }
                return -1
              }
              return -1
            })
          })
          return -1
        }
        return -1
      })
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

  obtenerImagenProducto(nombre_archivo){
    let resp = this.cocinaService.obtenerImagenPlato(nombre_archivo)
    console.log('resp', resp);
    
    return resp;
  }

  verDetalleReceta(receta){
    console.log('verDetalleReceta', receta);
    this.recetaSelected = receta
    this.visibleDetalleReceta = true;
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
      tipo_producto : [null, [Validators.required]]
    })

    console.log('Crear Producto');
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
      }
      console.log('unProducto', unProducto);

      this.cocinaService.crearProducto(unProducto).subscribe(resp=>{
        console.log('resp', resp);

        this.formDataProducto.append("id_producto", resp);
        this.cocinaService.subirImagenProducto(this.formDataProducto).subscribe(resp=>{
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

  cerrarCrearProducto(){
    this.isVisibleCrearProducto = false; 
  }

  cerrarModificarProducto(){
    this.isVisibleModificarProducto = false;
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
    })
  }

  guardarEliminarProducto(id_producto){
    console.log('id_producto', id_producto);
    const productoAEliminar = {
      "id_producto" : id_producto
    }

    this.cocinaService.eliminarProducto(productoAEliminar).subscribe(resp =>{
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
      "tipo_producto" : this.validateFormModificarProducto.value.tipo_producto
    }

    console.log('productoAModificar', productoAModificar);
    
    this.cocinaService.modificarProducto(productoAModificar).subscribe(resp =>{
      console.log('resp', resp);
      
      if (resp.includes('correctamente')){
        this.notification.create(
          'success', 'Producto modificado', 'Producto #'+id_producto
        )
        this.cerrarDrawerDetalleProducto();
        this.formDataProducto.append("id_producto", id_producto);
        this.cocinaService.subirImagenProducto(this.formDataProducto).subscribe(resp=>{
        console.log(resp)
        })

        setTimeout(() => {
          this.obtenerProductos();
        }, 1500);
      }
    })
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
}