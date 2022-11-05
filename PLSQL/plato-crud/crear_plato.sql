CREATE OR REPLACE FUNCTION crear_plato(cantidad_personas_recomendadas INTEGER,
									    comentario VARCHAR,
									    descripcion_plato VARCHAR,
									    disponibilidad boolean,
									    nombre_plato VARCHAR,
									    precio_plato INTEGER,
									    id_tipo_plato INTEGER )
										
RETURNS int AS
$BODY$
DECLARE
	
    v_idPlato INTEGER =  nextval('seq_id_plato') ;
	v_cant_person_recomendadas INTEGER = cantidad_personas_recomendadas;
    v_comentario VARCHAR = comentario;
    v_desc_plato VARCHAR = descripcion_plato;
    v_disponible BOOLEAN = disponibilidad;
    v_nombre_plato VARCHAR = nombre_plato;
    v_precio_plato INTEGER = precio_plato;
    v_id_tipo_plato INTEGER = id_tipo_plato;
    

BEGIN
  INSERT into plato (id_plato, cantidad_personas_recomendadas, comentario, descripcion_plato, disponibilidad,
                     nombre_plato, precio_plato, id_tipo_plato, eliminado)
  values (v_idPlato, v_cant_person_recomendadas, v_comentario, v_desc_plato, v_disponible, v_nombre_plato,
          v_precio_plato, v_id_tipo_plato, false);

    if not found then
        RETURN 'Id de plato incorrecto, intente nuevamente';
    else
        RETURN v_idPlato;
    end if;	
END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100