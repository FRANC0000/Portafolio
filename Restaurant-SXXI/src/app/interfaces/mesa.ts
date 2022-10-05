export interface EstadoMesa {
    id_estado_mesa : number;
    nombre_estado_mesa : string;
}

export interface TipoMesa {
    id_tipo_mesa : number;
    nombre_tipo_mesa : string;
    cantidad_asientos: number;
}

export interface Mesa {
    id_mesa : number,
    id_tipo_mesa: TipoMesa,
    id_estado_mesa: EstadoMesa
}