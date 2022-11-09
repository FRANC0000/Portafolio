CREATE OR REPLACE FUNCTION crear_receta(comentario VARCHAR,
									    complejidad VARCHAR,
									    tiempo_preparacion INTEGER
									    )
										
RETURNS varchar AS
$BODY$
DECLARE
	
    v_idReceta INTEGER =  nextval('seq_id_receta') ;
	v_comentario VARCHAR = comentario;
	v_complejidad VARCHAR = complejidad;
	v_tiempoPreparacion INTEGER = tiempo_preparacion;

BEGIN

  insert into receta(id_receta,comentario,complejidad,tiempo_preparacion,eliminado)
   VALUES (v_idReceta,v_comentario,v_complejidad,v_tiempoPreparacion,false);

  RETURN v_idReceta;

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100