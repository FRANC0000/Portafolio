CREATE OR REPLACE FUNCTION cancelar_reserva(id_reserva varchar)  
RETURNS varchar AS
$BODY$
DECLARE
	v_id_reserva varchar = id_reserva;
BEGIN

  -- insert into
  UPDATE reserva
	SET id_estado_reserva = 3
	WHERE reserva.id_reserva = v_id_reserva;

  if not found then
        RETURN 'La reserva no existe o ingresó mal el id.';
    else
        RETURN 'La reserva ¨'||v_id_reserva||'¨  fue cancelada con éxito';
   end if;
   
END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select cancelar_reserva('1001')