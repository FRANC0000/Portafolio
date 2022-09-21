CREATE OR REPLACE FUNCTION crear_usuario(idUsuario varchar,nombre varchar,apellidoP varchar,apellidoM varchar,rut varchar,rol varchar,correo varchar,contrasena varchar) 
RETURNS varchar AS
$BODY$
DECLARE
	v_idUsuario varchar = idUsuario;
	v_nombre varchar = nombre;
	v_apellidoP varchar = apellidoP;
	v_apellidoM varchar = apellidoM;
	v_rut varchar = rut;
	v_rol varchar = rol;
	v_correo varchar = correo;
	v_contrasena varchar = contrasena;
BEGIN

  -- insert into
  INSERT into usuario (id_usuario, apellido_materno, apellido_paterno, contrasena, correo, nombre, rol, rut)
  values (v_idUsuario, v_apellidoM, v_apellidoP, v_contrasena, v_correo, v_nombre, v_rol, v_rut );

  RETURN 'Usuario ¨'||v_idUsuario ||'¨ creado satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select crear_usuario('4DM1N', 'Administrador', 'apP', 'apM', '11.111.111-1', 'Administrador', 'admin@admin.com', 'admin') 

select * from usuario