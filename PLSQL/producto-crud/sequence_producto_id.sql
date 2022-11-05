CREATE SEQUENCE seq_id_producto
AS int
MINVALUE 1 
MAXVALUE 10000

OWNED BY producto.id_producto;