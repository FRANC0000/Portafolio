export interface user{
    id_usuario:string,
    rol: number,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    rut: number,
    dv: string
    correo: string,
    contrasena: string,
    eliminado? : boolean
}

export interface iniciarSesion{
    id_usuario: string,
    contrasena: string
}

export interface rol{
    id_rol : number,
    nombre_rol : string
}