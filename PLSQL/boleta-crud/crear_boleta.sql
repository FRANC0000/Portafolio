CREATE OR REPLACE FUNCTION crear_boleta(id_boleta integer, descuentos integer, extras integer, fecha_atencion timestamp, hora_atencion varchar, hora_emision varchar, subtotal integer, total integer, id_cliente integer, id_estado_boleta integer, id_tipo_pago integer, id_usuario varchar) 
RETURNS varchar AS
$BODY$
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
	v_idEstado_boleta integer = id_estado_boleta;
	v_idTipoPago integer = id_tipo_pago;
	v_idUsuario varchar = id_usuario;	
BEGIN
  -- insert into
  insert into boleta(
	id_boleta, descuentos, extras, fecha_atencion, hora_atencion, hora_emision, subtotal, total, id_cliente, id_estado_boleta ,id_tipo_pago, id_usuario)
	values (v_idBoleta, v_descuentos, v_extras, v_fechaAtencion, v_horaAtencion, v_horaEmision, v_subtotal, v_total, v_idCliente, v_idEstado_boleta, v_idTipoPago, v_idUsuario);

  RETURN 'Boleta ¨'|| v_idBoleta ||'¨ creada satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select crear_boleta(2, 1, 1, '2022-10-05 15:34:22.136', '15:34:22', '16:57:22', '25000', '27500', 20392004, 1, 1, 'admin')