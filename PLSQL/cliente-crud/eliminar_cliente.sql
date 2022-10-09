CREATE OR REPLACE FUNCTION eliminar_cliente(rut_cliente integer)
RETURNS varchar AS
$BODY$
DECLARE
    v_rutCliente integer = rut_cliente;

BEGIN

  DELETE FROM cliente WHERE cliente.rut_cliente = v_rutCliente;
  RETURN 'Cliente eliminado';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select eliminar_cliente(20627230);

select * from cliente