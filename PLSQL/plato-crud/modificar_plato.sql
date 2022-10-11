CREATE OR REPLACE FUNCTION modificar_plato(id_plato INTEGER, cantidad_personas_recomendadas INTEGER, comentario VARCHAR, 
										   descripcion_plato VARCHAR, disponibilidad BOOL, nombre_plato VARCHAR, 
										   precio_plato INTEGER, id_tipo_plato INTEGER) 
RETURNS VARCHAR AS
$BODY$
DECLARE
	v_idPlato integer = id_plato;
	v_nombrePlato VARCHAR = nombre_plato;
	v_precioPlato INTEGER = precio_Plato;
	v_cantidadPersonas INTEGER = cantidad_personas_recomendadas;
	v_descripcionPlato VARCHAR = descripcion_plato;
	v_comentarioPlato VARCHAR = comentario;
	v_disponibilidadPlato BOOL = disponibilidad;
	v_idTipoPlato INTEGER = id_tipo_plato;

BEGIN

  UPDATE plato
  SET id_plato = v_idPlato,
  		nombre_plato = v_nombrePlato,
		precio_plato = v_precioPlato,
		cantidad_personas_recomendadas = v_cantidadPersonas,
		descripcion_plato = v_descripcionPlato,
		comentario = v_comentarioPlato,
		disponibilidad = v_disponibilidadPlato,
		id_tipo_plato = v_idTipoPlato
		
  WHERE plato.id_plato = v_idPlato;

  RETURN 'Plato ¨'||v_nombrePlato ||'¨ modificado satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

SELECT modificar_plato(5, 1, 'APV', 'Rico', false, 'Cazuela de pollo', 5000, 1);
SELECT * FROM plato;
