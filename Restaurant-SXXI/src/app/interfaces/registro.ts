export interface BuzonEntrada{
    registro : Object,
    esRechazado : boolean,
    esAprobado  : boolean
}

export interface Registro {
    descripcion : string,
    titulo_registro :string,
    id_estado_registro : number,
    id_modulo : number,
    id_tipo_registro : number,
    id_usuario : string,
    id_registro_padre : number,
    version : number,
    id_reporte? : number
}