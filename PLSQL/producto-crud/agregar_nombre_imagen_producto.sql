CREATE OR REPLACE FUNCTION agregar_nombre_imagen_producto(idProducto integer, nombreImagen varchar)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	v_idProducto integer = idProducto;
	v_nombreImagen varchar = nombreImagen;	
BEGIN

  UPDATE producto
	SET nombre_imagen = v_nombreImagen
		
	WHERE producto.id_producto = v_idProducto;

  if not found then
        RETURN 'El producto no existe o ingresó mal el ID.';
    else
        RETURN 'El producto ¨'||v_idProducto||'¨ tiene nombre de imagen' ||v_nombreImagen;
    end if;


END;
$BODY$;