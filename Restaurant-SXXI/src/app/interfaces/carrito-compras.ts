import { Plato, Producto, Receta } from "./cocina";


export interface ProductoEnCarro {
    plato? : Plato,
    producto? : Producto,
    cantidad : number,
    esPlato : boolean,
    esProducto : boolean,
    valorUnitario : number,
    recetaSeleccionada?: number[],
    objetoRecetaSeleccionada? : Receta[]
}

export interface Pedido{
    idPedido? : number,
    carritoProductos? : ProductoEnCarro[],
    subtotal? : number,
    total? :number,
    rutCliente : number,
    idMesa : number,
    fechaIngreso : string,
    idEstadoIinstancia : number,
    idBoleta? : number
    nombreEstadoInstancia? : string
}

export interface Boleta{
    id_boleta?: number,
    rutCliente : number,
    idUsuario : string,
    idTipoPago?: number,
    fechaAtencion : string,
    horaAtencion: string,
    horaEmision?: string,
    subtotal : number,
    total ?: number,
    descuentos ?: number,
    extras ?: number,
    idEstadoBoleta ?: number
}

export interface PagosReabastecimiento{
    boleta : Boleta,
    esPago1 : boolean,
    esPago2 : boolean
}

export interface TipoPago{
    id_tipo_pago,
    nombre_tipo_pago,
    comentario
}

export interface EstadoBoleta{
    id_estado_boleta : number,
    nombre_estado_boleta : string
}

export interface InstanciarBoleta{
    boleta : Boleta
}

export interface InstanciarPedido{
    pedido : Pedido
}