CREATE OR REPLACE FUNCTION modificar_instancia_pedido(id_pedido integer,id_estado_instancia integer) 
RETURNS varchar AS
$BODY$
DECLARE
    v_idPedido integer = id_pedido;
	v_idEstadoInstancia integer = id_estado_instancia;
BEGIN
	update pedido
	set id_estado_instancia = v_idEstadoInstancia
	where pedido.id_pedido = v_idPedido;	 

  RETURN 'Pedido ¨'|| v_idPedido ||'¨ actualizada satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100