CREATE OR REPLACE FUNCTION crear_mesa(idTipoMesa integer, idEstadoMesa integer) 
RETURNS int AS
$BODY$
DECLARE
	v_idMesa integer = nextval('seq_id_mesa');
	v_idTipoMesa integer = idTipoMesa;
	v_idEstadoMesa integer = idEstadoMesa;
BEGIN

  insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa, eliminado) values (v_idMesa, v_idTipoMesa, v_idEstadoMesa, false);

  RETURN v_idMesa;

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select crear_mesa(1, 1);