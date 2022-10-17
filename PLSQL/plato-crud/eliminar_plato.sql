CREATE OR REPLACE FUNCTION eliminar_plato(id_plato integer)
RETURNS VARCHAR AS
$BODY$

DECLARE
	v_idPlato integer = id_plato;
BEGIN
	UPDATE plato 
	set eliminado = true
	
	where plato.id_plato = v_idPlato;
	
	if not found then
		RETURN 'Id de plato incorrecto';
	else
		RETURN 'Plato: ¨'|| v_idPlato ||'¨, eliminado satisfactoriamente';
	end if;
	
END;
$BODY$

LANGUAGE plpgsql VOLATILE COST 100

select * from plato;
select eliminar_plato(1)




