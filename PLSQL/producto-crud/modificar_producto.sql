CREATE OR REPLACE FUNCTION modificar_producto(id_producto integer, comentario varchar, fecha_ingreso_producto timestamp,
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
  UPDATE producto
	SET comentario = v_comentario,
		fecha_ingreso_producto = v_fecha_ingreso_producto,
		fecha_vencimiento = v_fecha_vencimiento,
		medida_producto = v_medida_producto,
		nombre_producto = v_nombre_producto,
		stock_producto = v_stock_producto,
		valor_unitario = v_valor_unitario,
		tipo_producto = v_tipo_producto
		
	WHERE producto.id_producto = v_id_producto;

  if not found then
        RETURN 'El producto no existe o ingresó mal el id.';
    else
        RETURN 'El producto  ¨'||v_nombre_producto||'¨  fue modificado con éxito';
   end if;


END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select * from producto

select modificar_producto(1, 'ola', '2022-10-05 15:34:22.136','2022-10-05 15:34:22.136', 'ola', 'aloo',
										  21, 8300, 1)