CREATE OR REPLACE FUNCTION modificar_cliente(rut_cliente integer, nombre_cliente VARCHAR) 
RETURNS varchar AS
$BODY$
DECLARE
	v_rutCliente integer = rut_cliente;
	v_nombreCliente VARCHAR = nombre_cliente;

BEGIN

  UPDATE cliente 
  SET nombre_cliente = v_nombreCliente
  WHERE cliente.rut_cliente = v_rutCliente;

  RETURN 'Cliente ¨'||v_nombreCliente ||'¨ modificado satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100
----
SELECT modificar_cliente(20627230, 'Franco Soto');
SELECT * FROM cliente;