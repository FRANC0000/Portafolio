CREATE OR REPLACE FUNCTION modificar_mesa(idMesa integer, idTipoMesa integer, idEstadoMesa integer , eliminado boolean)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	v_idMesa integer = idMesa;
	v_idEstadoMesa integer = idEstadoMesa;
	v_idTipoMesa integer = idTipoMesa;
	v_eliminado boolean = eliminado;
	
BEGIN

  UPDATE mesa
	SET eliminado = v_eliminado,
		id_estado_mesa = v_idEstadoMesa,
		id_tipo_mesa = v_idTipoMesa
		
	WHERE id_mesa = v_idMesa;

  if not found then
        RETURN 'La mesa no existe o ingresó mal el ID.';
    else
        RETURN 'La mesa ¨'||v_idMesa||'¨ actualizada satisfactoriamente';
    end if;


END;
$BODY$;