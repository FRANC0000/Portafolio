CREATE OR REPLACE FUNCTION eliminar_mesa(id_mesa integer)
RETURNS VARCHAR AS
$BODY$

DECLARE
	v_idMesa integer = id_mesa;
BEGIN
	UPDATE mesa 
	set eliminado = true
	
	where mesa.id_mesa = v_idMesa;
	
	if not found then
		RETURN 'Id de mesa incorrecto';
	else
		RETURN 'Mesa: ¨'|| v_idMesa ||'¨, eliminada satisfactoriamente';
	end if;
	
END;
$BODY$

LANGUAGE plpgsql VOLATILE COST 100