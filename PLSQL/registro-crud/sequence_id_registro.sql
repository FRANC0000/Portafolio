CREATE SEQUENCE IF NOT EXISTS public.seq_id_registro
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 10000
    CACHE 1
    OWNED BY registro.id_registro;