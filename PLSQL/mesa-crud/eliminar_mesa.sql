CREATE OR REPLACE FUNCTION eliminar_mesa(idMesa integer)
RETURNS varchar AS
$BODY$
DECLARE
	v_idMesa int = idMesa;
BEGIN

	DELETE FROM mesa where mesa.id_mesa = v_idMesa;
	
	
	if not found then
		RETURN 'Id de mesa incorrecto';
	else
		RETURN 'Mesa: ¨'|| v_idMesa ||'¨, eliminada satisfactoriamente';
	end if;
	
END;