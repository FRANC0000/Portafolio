CREATE OR REPLACE FUNCTION crear_productos_pedido(id_pedido integer, id_producto integer, cantidad_producto integer) 
RETURNS varchar AS
$BODY$
DECLARE
    v_idPedido integer = id_pedido;
	v_idProducto integer = id_producto;
	v_cantidadPlatos integer = cantidad_producto;
	
BEGIN
  -- insert into
  insert into productos_pedido(
	id_pedido,id_producto,cantidad_producto)
	values (v_idPedido, v_idProducto, v_cantidadPlatos);

  RETURN 'Platos pedido  ¨'|| v_idPedido ||'¨ creada satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100