CREATE OR REPLACE FUNCTION agregar_nombre_imagen_plato(idPlato integer, nombreImagen varchar)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	v_idPlato integer = idPlato;
	v_nombreImagen varchar = nombreImagen;	
BEGIN

  UPDATE plato
	SET nombre_imagen = v_nombreImagen
		
	WHERE plato.id_plato = v_idPlato;

  if not found then
        RETURN 'El plato no existe o ingresó mal el ID.';
    else
        RETURN 'La plato ¨'||v_idPlato||'¨ tiene nombre de imagen' ||v_nombreImagen;
    end if;


END;
$BODY$;