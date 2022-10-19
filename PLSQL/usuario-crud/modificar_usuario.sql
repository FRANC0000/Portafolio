CREATE OR REPLACE FUNCTION modificar_usuario(id_usuario VARCHAR,
											 nombre VARCHAR,
											 apellido_paterno VARCHAR,
											 apellido_materno VARCHAR,
											 rut integer,
											 dv CHAR,
											 id_rol integer,
											 correo VARCHAR ,
											 contrasena VARCHAR)
										
RETURNS varchar AS
$BODY$
DECLARE
	v_idUsuario VARCHAR = id_usuario;
	v_nombre VARCHAR = nombre;
	v_apellidoPaterno VARCHAR = apellido_paterno;
	v_apellidoMaterno VARCHAR = apellido_materno;
	v_rut INTEGER = rut;
	v_dv CHAR = dv; 
	v_idRol INTEGER = id_rol;
	v_correo VARCHAR = correo;
	v_contrasena VARCHAR = contrasena;
	
BEGIN

  UPDATE usuario
  
  SET  	id_usuario = v_idUsuario,
	  	nombre = v_nombre,
		apellido_paterno = v_apellidoPaterno,
		apellido_Materno = v_apellidoMaterno,
		rut = v_rut,
		dv = v_dv,
		id_rol = v_idRol,
		correo = v_correo, 
       	contrasena = v_contrasena
        
  WHERE usuario.id_usuario = v_idUsuario;

  RETURN 'Id usuario ¨'||v_idUsuario ||'¨ modificada correctamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select modificar_usuario('idprueba','nombreprueba', 'ap','am' , 20703828,'k',65677,'lamano@gmail.com','sacateunoa');


select eliminar_usuario('idprueba')
SELECT * from usuario;
