CREATE OR REPLACE FUNCTION crear_pedido(id_pedido integer, fecha_ingreso timestamp, id_cliente integer, id_estado_instancia integer, id_mesa integer, subtotal integer, id_boleta integer) 
RETURNS varchar AS
$BODY$
DECLARE
    v_idPedido integer = id_pedido;
	v_fechaIngreso timestamp = fecha_ingreso;
	v_idCliente integer = id_cliente;
	v_idEstadoInstancia integer = id_estado_instancia;
	v_idMesa integer = id_mesa;
	v_subtotal integer = subtotal;
	v_idBoleta integer = id_boleta;
BEGIN
  -- insert into
  insert into pedido(
	id_pedido,fecha_ingreso,id_cliente,id_estado_instancia,id_mesa,subtotal,id_boleta)
	values (v_idPedido, v_fechaIngreso, v_idCliente, v_idEstadoInstancia, v_idMesa, v_subtotal, v_idBoleta);

  RETURN 'Pedido ¨'|| v_idPedido ||'¨ creada satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100