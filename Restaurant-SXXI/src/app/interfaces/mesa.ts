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

export interface Cliente {
    rut_cliente : number
    dv_cliente : string,
    nombre_cliente :string,
}

export interface Reserva {
    id_reserva : number,
    id_estado_reserva : number,
    id_mesa : number,
    rut_cliente : number,
    dv_cliente : string,
    cant_consumidores: number,
    fecha_reserva : Date,
    hora_reserva : Date,
    comentario : string
}

export interface IngresarReserva{
    clienteAIngresar : Cliente,
    reservaAIngresar : Reserva
}