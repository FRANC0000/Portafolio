CREATE OR REPLACE FUNCTION crear_cliente(rut_cliente integer, dv_cliente VARCHAR, fecha_ingreso timestamp, nombre_cliente VARCHAR) 
RETURNS varchar AS
$BODY$
DECLARE
    v_rutCliente integer = rut_cliente;
    v_dvCliente varchar = dv_cliente;
    v_fechaIngreso TIMESTAMP = fecha_ingreso;
    v_nombreCliente varchar = nombre_cliente;

BEGIN

  -- insert into
  INSERT into cliente (rut_cliente, dv_cliente, fecha_ingreso, nombre_cliente)
  values (v_rutCliente, v_dvCliente, v_fechaIngreso, v_nombreCliente);

  RETURN 'Cliente ¨' ||v_nombreCliente|| '¨ creado satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100


select crear_cliente(20627230, '9', '2022-10-05 15:34:22.136', 'Benjamín Matus');