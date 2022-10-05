CREATE OR REPLACE FUNCTION crear_mesa(idMesa integer,idTipoMesa integer,idEstadoMesa integer) 
RETURNS varchar AS
$BODY$
DECLARE
	v_idMesa integer = idMesa;
	v_idTipoMesa integer = idTipoMesa;
	v_idEstadoMesa integer = idEstadoMesa;
BEGIN

  -- insert into
  insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa) values (v_idMesa, v_idTipoMesa, v_idEstadoMesa);

  RETURN 'Mesa ¨'||v_idMesa ||'¨ creada satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select crear_mesa(24, 1,1);
