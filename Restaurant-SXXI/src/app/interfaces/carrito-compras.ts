import { Plato, Producto } from "./cocina";


export interface ProductoEnCarro {
    plato? : Plato,
    producto? : Producto,
    cantidad : number,
    esPlato : boolean,
    esProducto : boolean,
    valorUnitario : number
}

export interface Pedido{
    carritoProductos? : ProductoEnCarro[],
    subtotal? : number,
    total? :number,
    rutCliente : number,
    idMesa : number,
    fechaIngreso : string,
    idEstadoIinstancia : number
}