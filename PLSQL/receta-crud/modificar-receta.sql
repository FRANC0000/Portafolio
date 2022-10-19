CREATE OR REPLACE FUNCTION modificar_receta(id_receta INTEGER, comentario VARCHAR, complejidad VARCHAR, tiempo_preparacion INTEGER, eliminado boolean)

RETURNS varchar AS
$BODY$
DECLARE
	v_idReceta INTEGER =  id_receta ;
	v_comentario VARCHAR = comentario;
	v_complejidad VARCHAR = complejidad;
	v_tiempoPreparacion INTEGER = tiempo_preparacion;
	v_eliminado BOOLEAN = eliminado;

BEGIN

  UPDATE receta 
  SET comentario = v_comentario, complejidad = v_complejidad, 
  	  tiempo_preparacion = v_tiempoPreparacion,eliminado = v_eliminado 
  WHERE receta.id_receta = v_idReceta;

  RETURN 'Id receta ¨'||v_idReceta ||'¨ modificada correctamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select modificar_receta(9, 'soteldo', 'dificl', 17,FALSE);
select crear_receta(9, 'soto', 'dificfczl', 13,FALSE);
SELECT * from receta;

drop table receta;