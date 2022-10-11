CREATE OR REPLACE FUNCTION crear_producto(id_producto integer,comentario varchar, fecha_ingreso_producto timestamp,
										  fecha_vencimiento timestamp, medida_producto varchar, nombre_producto varchar,
										  stock_producto integer, valor_unitario integer, tipo_producto integer)  
RETURNS varchar AS
$BODY$
DECLARE
	v_id_producto integer = id_producto; 
	v_comentario varchar = comentario;
	v_fecha_ingreso_producto timestamp = fecha_ingreso_producto;
	v_fecha_vencimiento timestamp = fecha_vencimiento;
	v_medida_producto varchar = medida_producto;
	v_nombre_producto varchar = nombre_producto;
	v_stock_producto integer = stock_producto;
	v_valor_unitario integer = valor_unitario;
	v_tipo_producto integer = tipo_producto;
	
	
BEGIN

  -- insert into
  insert into producto (id_producto, comentario, fecha_ingreso_producto, fecha_vencimiento,
					medida_producto, nombre_producto, stock_producto, valor_unitario, tipo_producto)
					values (v_id_producto, v_comentario, v_fecha_ingreso_producto, v_fecha_vencimiento,
					v_medida_producto, v_nombre_producto, v_stock_producto, v_valor_unitario, v_tipo_producto);

  RETURN 'Producto ¨'||v_nombre_producto||'¨ creado satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select * from producto
select * from tipo_producto
select crear_producto(1,'alo','2022-10-05 15:34:22.136','2022-10-05 15:34:22.136', 'alo', 'ola', 20, 8200, 1)  