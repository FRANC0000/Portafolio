CREATE OR REPLACE FUNCTION modificar_boleta(
	id_boleta integer,
	descuentos integer,
	extras integer,
	fecha_atencion timestamp,
	hora_atencion varchar,
	hora_emision varchar,
	subtotal integer,
	total integer,
	id_cliente integer,
	id_estado_boleta integer,
	id_tipo_pago integer,
	id_usuario varchar)
    RETURNS character varying
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
	v_idBoleta integer = id_boleta;
	v_descuentos integer = descuentos;
	v_extras integer = extras;
	v_fechaAtencion timestamp = fecha_atencion;
	v_horaAtencion varchar = hora_atencion;
	v_horaEmision varchar = hora_emision;
	v_subtotal integer = subtotal;
	v_total integer = total;
	v_idCliente integer = id_cliente;
	v_idEstadoBoleta integer = id_estado_boleta;
	v_idTipoPago integer = id_tipo_pago;
	v_idUsuario varchar = id_usuario;
BEGIN

  -- insert into
  UPDATE boleta
	SET descuentos = v_descuentos,
		extras = v_extras,
		fecha_atencion = v_fechaAtencion,
		hora_atencion = v_horaAtencion,
		hora_emision = v_horaEmision,
		subtotal = v_subtotal,
		total = v_total,
		id_cliente = v_idCliente,
		id_estado_boleta = v_idEstadoBoleta,
		id_tipo_pago = v_idTipoPago,
		id_usuario = v_idUsuario		
	WHERE boleta.id_boleta = v_idBoleta;

  if not found then
        RETURN 'La boleta no existe o ingresó mal el id.';
    else
        RETURN 'La boleta  ¨'||v_idBoleta||'¨  fue modificada con éxito';
    end if;

END;
$BODY$;

select * from boleta
select modificar_boleta(1043, 0, 2120,'2022-10-18 00:00:00','21:38:10','21:44:49',21200,23320,10092408,3,1,'admin')