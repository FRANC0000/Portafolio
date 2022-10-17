export interface Plato {
    id_plato : number,
    id_tipo_plato : number,
    nombre_plato : string,
    precio_plato : number,
    cantidad_personas_recomendadas : number,
    descripcion_plato : string,
    comentario : string,
    disponibilidad : boolean,
    eliminado : boolean
}

export interface Receta {
    id_receta : number,
    comentario : string,
    complejidad : string,
    tiempo_preparacion : number
}

export interface tipo_plato {
    id_tipo_plato : number,
    descripcion_tipo_plato : string,
    nombre_tipo_plato : string
}

export interface PlatoId {
    id_plato : number
}