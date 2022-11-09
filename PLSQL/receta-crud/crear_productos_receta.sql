CREATE OR REPLACE FUNCTION public.crear_productos_receta(
	id_producto integer,
	id_receta integer,
	cantidad_producto integer,
	comentario character varying)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    v_idProducto integer = id_producto;
	v_idReceta integer = id_receta;
	v_cantidadProducto integer = cantidad_producto;
	v_comentario varchar = comentario;
	
BEGIN
  -- insert into
  insert into productos_receta(
	id_producto,id_receta,cantidad_producto, comentario)
	values (v_idProducto, v_idReceta, v_cantidadProducto, v_comentario);

  RETURN v_idReceta;

END;
$BODY$;

ALTER FUNCTION public.crear_productos_receta(integer, integer, integer, character varying)
    OWNER TO postgres;