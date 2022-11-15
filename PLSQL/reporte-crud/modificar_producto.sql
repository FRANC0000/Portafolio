CREATE OR REPLACE FUNCTION public.modificar_reporte(
	id_reporte integer,
	comentario character varying,
	extension character varying,
	fecha_creacion timestamp without time zone,
	nombre_creacion character varying,
	titulo_reporte character varying,
	id_tipo_reporte integer,
	id_usuario varchar)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	v_id_reporte integer = id_reporte; 
	v_comentario varchar = comentario;
	v_extension_archivo varchar = extension;
	v_fecha_creacion timestamp = fecha_creacion;
	v_nombre_creacion varchar = nombre_creacion;
	v_titulo_reporte varchar = titulo_reporte;
	v_id_tipo_reporte integer = id_tipo_reporte;
	v_id_usuario varchar = id_usuario;
BEGIN

  UPDATE reporte
	SET comentario = v_comentario,
		extension = v_extension_archivo,
		fecha_creacion = v_fecha_creacion,
		nombre_creacion = v_nombre_creacion,
		titulo_reporte = v_titulo_reporte,
		id_tipo_reporte = v_id_tipo_reporte,
		id_usuario = v_id_usuario
		
	WHERE reporte.id_reporte = v_id_reporte;

  if not found then
        RETURN 'El reporte no existe o ingresó mal el id.';
    else
        RETURN 'El reporte  ¨'||v_id_reporte||'¨  fue modificado con éxito';
   end if;

END;
$BODY$;