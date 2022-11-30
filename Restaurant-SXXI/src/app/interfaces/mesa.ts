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
    id_mesa? : number,
    id_tipo_mesa?: number,
    id_estado_mesa?: number,
    tipoMesa? : TipoMesa,
    tipoEstadoMesa?: EstadoMesa,
    eliminado? : boolean
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
    comentario : string,
    interaccion? : boolean
}

export interface IngresarReserva{
    clienteAIngresar : Cliente,
    reservaAIngresar : Reserva
}

export interface CancelarReserva{
    id_reserva : string
}

export interface ModificarReserva{
    id_reserva : string,
    interaccion : boolean
}

export interface EncuestaCancelacion {
    motivo : string,
    puntuacion_atencion: number,
    comentario : string,
    id_reserva : number
}

export interface EncuestaSatisfaccion {
    puntuacion_comida : number,
    puntuacion_tiempo_atencion : number,
    puntuacion_trato_del_personal : number,
    puntuacion_interaccion_sistema : number, 
    recomendado : boolean,
    vuelta : boolean,
    comentario : string,
    id_reserva : number,
}