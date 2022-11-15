CREATE OR REPLACE VIEW public.vista_reporte_stock2
 AS
 SELECT producto.id_producto AS "ID Producto",
    producto.nombre_producto AS "Nombre",
    producto.medida_producto AS "Medida",
    producto.stock_ideal AS "Stock ideal",
    producto.stock_producto AS "Stock actual",
    producto.stock_producto * 100 / producto.stock_ideal AS "% respecto ideal",
    concat(100 - producto.stock_producto * 100 / producto.stock_ideal, '%') AS "% productos faltantes",
	
   -- producto.fecha_vencimiento - producto.fecha_ingreso_producto AS "Vencimiento en",
     --  CASE
           -- WHEN producto.tipo_producto = 1 THEN 'Ingrediente'
          -- ELSE 'Bebestible'
        --END AS "Tipo",
    producto.valor_unitario AS "Valor unitario"
	
   FROM producto
  WHERE producto.eliminado = false
  ORDER BY producto.tipo_producto DESC;

ALTER TABLE public.vista_reporte_stock2
    OWNER TO postgres;