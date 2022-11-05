
CREATE SEQUENCE seq_id_receta
AS int
MINVALUE 1 
MAXVALUE 100

OWNED BY receta.id_receta;