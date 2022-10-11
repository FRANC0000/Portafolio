CREATE OR REPLACE FUNCTION eliminar_plato(idPlato integer)
RETURNS varchar AS
$BODY$
DECLARE
    v_id_plato integer = idPlato;

BEGIN

  DELETE FROM plato WHERE plato.id_plato = v_id_plato;
  
  if not found then
		RETURN 'Id de plato incorrecto, intente nuevamente';
	else
		RETURN 'Plato ID:'|| v_id_plato ||' eliminado';
	end if;

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select * from plato;
select eliminar_plato(5);