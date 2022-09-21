export interface user{
    id_usuario:string,
    rol: string,
    nombre: string,
    apellido_paterno: string,
    apellido_materno: string,
    rut: string,
    correo: string,
    contrasena: string
}

export interface iniciarSesion{
    id_usuario: string,
    contrasena: string
}