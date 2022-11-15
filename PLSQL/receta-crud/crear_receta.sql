CREATE OR REPLACE FUNCTION crear_receta(comentario VARCHAR,
									    complejidad VARCHAR,
									    tiempo_preparacion INTEGER,
										id_plato Integer
									    )
										
RETURNS varchar AS
$BODY$
DECLARE
	
    v_idReceta INTEGER =  nextval('seq_id_receta') ;
	v_comentario VARCHAR = comentario;
	v_complejidad VARCHAR = complejidad;
	v_tiempoPreparacion INTEGER = tiempo_preparacion;
	v_idPlato INTEGER = id_plato;

BEGIN

  insert into receta(id_receta,comentario,complejidad,tiempo_preparacion,eliminado, id_plato)
   VALUES (v_idReceta,v_comentario,v_complejidad,v_tiempoPreparacion,false, v_idPlato);

  RETURN v_idReceta;

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100