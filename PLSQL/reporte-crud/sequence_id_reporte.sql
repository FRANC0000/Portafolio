CREATE SEQUENCE IF NOT EXISTS public.seq_id_reporte
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 10000
    CACHE 1
    OWNED BY reporte.id_reporte;