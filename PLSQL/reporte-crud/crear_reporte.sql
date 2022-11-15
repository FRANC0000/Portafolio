CREATE OR REPLACE FUNCTION public.crear_reporte(
	comentario character varying,
	extension character varying,
	fecha_creacion timestamp without time zone,
	nombre_creacion character varying,
	titulo_reporte character varying,
	id_tipo_reporte INTEGER,
	id_usuario varchar)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	v_id_reporte integer = nextval('seq_id_reporte'); 
	v_comentario varchar = comentario;
	v_extension_archivo varchar = extension;
	v_fecha_creacion timestamp = fecha_creacion;
	v_nombre_creacion varchar = nombre_creacion;
	v_titulo_reporte varchar = titulo_reporte;
	v_id_tipo_reporte integer = id_tipo_reporte;
	v_id_usuario varchar = id_usuario;
	
BEGIN

  insert into reporte (id_reporte, comentario, extension, fecha_creacion, nombre_creacion, titulo_reporte,
					   id_tipo_reporte, id_usuario, eliminado)
					values (v_id_reporte, v_comentario, v_extension_archivo, v_fecha_creacion,
					v_nombre_creacion, v_titulo_reporte, v_id_tipo_reporte, v_id_usuario, false);

  RETURN 'Reporte ¨'||v_id_reporte ||'¨ creado satisfactoriamente';

END;
$BODY$;