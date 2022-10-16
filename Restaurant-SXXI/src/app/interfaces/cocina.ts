export interface Plato {
    id_plato : number,
    id_tipo_plato : number,
    nombre_plato : string,
    precio_plato : number,
    cantidad_personas_recomendadas : number,
    descripcion_plato : string,
    comentario : string,
    disponibilidad : boolean
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
    fecha_ingreso_producto : string
}