export interface Plato {
    id_plato ?: number,
    id_tipo_plato : number,
    nombre_plato : string,
    precio_plato : number,
    cantidad_personas_recomendadas : number,
    descripcion_plato : string,
    comentario : string,
    disponibilidad : boolean,
    eliminado? : boolean,
    nombre_imagen? : string
}

export interface Producto{
    id_producto : number,
    nombre_producto : string,
    stock_producto : number,
    medida_producto : string,
    fecha_vencimiento : string,
    valor_unitario: string,
    id_tipo_producto: number,
    comentario : string,
    fecha_ingreso_producto : string,
    nombre_imagen? : string
}

export interface Receta {
    id_receta : number,
    comentario : string,
    complejidad : string,
    tiempoPreparacion : number,
    eliminado : boolean,
    productos ?: Producto
}

export interface TipoPlato {
    id_tipo_plato : number,
    descripcion_tipo_plato : string,
    nombre_tipo_plato : string
}

export interface TipoProducto{
    id_tipo_producto : number,
    comentario : string,
    nombre_tipo_producto : string
}

export interface ProductosReceta{
    id_producto : number,
    nombre_producto : string,
    cantidad : number,
    comentario : string
}