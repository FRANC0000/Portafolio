CREATE OR REPLACE FUNCTION eliminar_usuario(id_usuario varchar) 
RETURNS varchar AS
$BODY$
DECLARE
	v_idUsuario varchar = id_usuario;
	
BEGIN
	-- select * from
	update usuario u 
	set eliminado = true
	where u.id_usuario = v_idUsuario;

	if not found then
		RETURN 'El usuario no existe o ingresó mal el id.';
	else
		RETURN 'El usuario  ¨'|| v_idUsuario ||'¨  fue eliminado con éxito';
	end if;
END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select eliminar_usuario('id_de_usuario');

select * from usuario