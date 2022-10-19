CREATE OR REPLACE FUNCTION eliminar_receta(idReceta integer)
RETURNS varchar AS
$BODY$
DECLARE
	v_idReceta int = idReceta;
BEGIN

	
	UPDATE receta
	set eliminado = true
	where receta.id_receta = v_idReceta;
	
	if not found then
		RETURN 'Id de receta incorrecto';
	else
		RETURN 'Receta: ¨'|| v_idReceta ||'¨, eliminada satisfactoriamente';
	end if;
	
END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100


SELECT * from receta;
