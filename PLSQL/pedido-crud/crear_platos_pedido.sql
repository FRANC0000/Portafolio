CREATE OR REPLACE FUNCTION crear_platos_pedido(id_pedido integer, id_plato integer, cantidad_platos integer) 
RETURNS varchar AS
$BODY$
DECLARE
    v_idPedido integer = id_pedido;
	v_idPlato integer = id_plato;
	v_cantidadPlatos integer = cantidad_platos;
	
BEGIN
  -- insert into
  insert into platos_pedido(
	id_pedido,id_plato,cantidad_platos)
	values (v_idPedido, v_idPlato, v_cantidadPlatos);

  RETURN 'Platos pedido  ¨'|| v_idPedido ||'¨ creada satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100