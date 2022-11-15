CREATE OR REPLACE FUNCTION public.eliminar_reporte(
	id_reporte integer)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    v_id_reporte integer = id_reporte;

BEGIN
	
	update reporte set
	eliminado = true
	WHERE reporte.id_reporte = v_id_reporte;
  	--update reporte set
  	--eliminado = true
  	--WHERE reporte.id_reporte = v_id_reporte;
	
	if not found then
		RETURN 'Id de reporte es incorrecto o no existe';
	else
		RETURN 'Reporte: ¨'|| v_id_reporte ||'¨, eliminado satisfactoriamente';
	end if;

END;
$BODY$;