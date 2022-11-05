CREATE OR REPLACE FUNCTION modificar_receta(id_receta INTEGER, comentario VARCHAR, complejidad VARCHAR, tiempo_preparacion INTEGER)

RETURNS varchar AS
$BODY$
DECLARE
	v_idReceta INTEGER =  id_receta ;
	v_comentario VARCHAR = comentario;
	v_complejidad VARCHAR = complejidad;
	v_tiempoPreparacion INTEGER = tiempo_preparacion;

BEGIN

  UPDATE receta 
  SET 	comentario = v_comentario, 
  		complejidad = v_complejidad, 
  	  	tiempo_preparacion = v_tiempoPreparacion
  WHERE receta.id_receta = v_idReceta;

  RETURN 'Id receta ¨'||v_idReceta ||'¨ modificada correctamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100