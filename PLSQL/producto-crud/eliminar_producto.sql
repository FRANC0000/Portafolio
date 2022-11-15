CREATE OR REPLACE FUNCTION eliminar_producto(id_producto integer)
RETURNS varchar AS
$BODY$
DECLARE
    v_id_producto integer = id_producto;

BEGIN

  update producto set
  eliminado = true
  WHERE producto.id_producto = v_id_producto;
  RETURN 'Producto eliminado';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select * from producto
select eliminar_producto(1)