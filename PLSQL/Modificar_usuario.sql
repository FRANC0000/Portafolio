CREATE OR REPLACE FUNCTION modificar_usuario(idUsuario varchar, nombre varchar,apellidoP varchar,apellidoM varchar,rut varchar,rol varchar,correo varchar,contrasena varchar) 
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
  UPDATE usuario
  SET nombre = v_nombre , apellido_paterno = v_apellidoP, apellido_materno = v_apellidoM, rut = v_rut , rol= v_rol, 
    correo =v_correo, contrasena = v_contrasena
  WHERE id_usuario = v_idUsuario;
 if not found then
		RETURN 'Usuario no existe';
	else
		RETURN 'Usuario ¨'||v_idUsuario ||'¨ modificado satisfactoriamente';
	end if;
 
END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100
	modificar_usuario(idUsuario varchar, nombre varchar,apellidoP varchar,apellidoM varchar,rut varchar,rol varchar,correo varchar,contrasena varchar)
select modificar_usuario('puelca','franco','teran','peña','1456789','Bodega','franco.puelca@gmail.com','1235');



SELECT * FROM usuario