CREATE OR REPLACE FUNCTION crear_usuario(idUsuario varchar,nombre varchar,apellidoP varchar,apellidoM varchar,rut_usuario integer, dv_usuario varchar, rol integer,correo varchar,contrasena varchar) 
RETURNS varchar AS
$BODY$
DECLARE
	v_idUsuario varchar = idUsuario;
	v_nombre varchar = nombre;
	v_apellidoP varchar = apellidoP;
	v_apellidoM varchar = apellidoM;
	v_rut integer = rut_usuario;
	v_dv varchar = dv_usuario;
	v_rol integer = rol;
	v_correo varchar = correo;
	v_contrasena varchar = contrasena;
BEGIN

  -- insert into
  INSERT into usuario (id_usuario, apellido_materno, apellido_paterno, contrasena, correo, dv, nombre, rut, id_rol, eliminado)
  values (v_idUsuario, v_apellidoM, v_apellidoP, v_contrasena, v_correo, v_dv, v_nombre, v_rut, v_rol, false);

  RETURN 'Usuario ¨'||v_idUsuario ||'¨ creado satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

--Crear rol 1 - Administrador previamente
select crear_usuario('4DM1N', 'Administrador', 'apP', 'apM', 20392004, '0', 1,'admin@admin.com', 'admin') 

select * from usuario