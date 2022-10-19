CREATE OR REPLACE FUNCTION crear_plato(idPlato integer, cantidad_personas_r integer, comentario varchar,
desc_plato varchar, disponibilidad boolean, nom_plato varchar, precio_plato integer, idTipoPlato integer, eliminado boolean)
RETURNS VARCHAR AS
$BODY$
DECLARE
    v_idPlato INTEGER = idPlato;
    v_cant_person_recomendadas INTEGER = cantidad_personas_r;
    v_comentario VARCHAR = comentario;
    v_desc_plato VARCHAR = desc_plato;
    v_disponible BOOLEAN = disponibilidad;
    v_nombre_plato VARCHAR = nom_plato;
    v_precio_plato INTEGER = precio_plato;
    v_id_tipo_plato INTEGER = idTipoPlato;
    v_eliminado BOOLEAN = eliminado;

BEGIN
  INSERT into plato (id_plato, cantidad_personas_recomendadas, comentario, descripcion_plato, disponibilidad,
                     nombre_plato, precio_plato, id_tipo_plato, eliminado)
  values (v_idPlato, v_cant_person_recomendadas, v_comentario, v_desc_plato, v_disponible, v_nombre_plato,
          v_precio_plato, v_id_tipo_plato, v_eliminado);

    if not found then
        RETURN 'Id de plato incorrecto, intente nuevamente';
    else
        RETURN 'Nombre plato: ¨'|| v_nombre_plato ||'¨, creado satisfactoriamente';
    end if;	
END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100