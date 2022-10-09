CREATE OR REPLACE FUNCTION modificar_mesa(
	idmesa integer,
	idestadomesa integer)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	v_idMesa integer = idMesa;
	v_idEstadoMesa integer = idEstadoMesa;
BEGIN

  -- insert into
  UPDATE mesa
	SET id_estado_mesa = v_idEstadoMesa
		
	WHERE id_mesa = v_idMesa;

  if not found then
        RETURN 'La mesa no existe o ingresó mal el id.';
    else
        RETURN 'La mesa  ¨'||v_idMesa||'¨  fue modificada con éxito';
    end if;


END;
$BODY$;

ALTER FUNCTION public.modificar_mesa(integer, integer)
    OWNER TO postgres;
	
SELECT * from mesa;