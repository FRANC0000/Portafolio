CREATE OR REPLACE FUNCTION crear_reserva(id_reserva integer, cantidad_consumidores integer, comentario varchar, fecha_reserva Timestamp, hora_reserva varchar, id_cliente integer, id_estado_reserva integer, id_mesa integer) 
RETURNS varchar AS
$BODY$
DECLARE
    v_idReserva integer = id_reserva;
	v_cantConsumidores integer = cantidad_consumidores;
	v_comentario varchar = comentario;
	v_fechaReserva Timestamp = fecha_reserva;
	v_horaReserva varchar = hora_reserva;
	v_idCliente integer = id_cliente;
	v_idEstadoReserva integer = id_estado_reserva;
	v_idMesa integer = id_mesa;
	
BEGIN
  -- insert into
  INSERT into reserva (id_reserva, cant_consumidores, comentario, fecha_reserva, hora_reserva, id_cliente, id_estado_reserva, id_mesa)
  values (v_idReserva, v_cantConsumidores, v_comentario, v_fechaReserva, v_horaReserva, v_idCliente, v_idEstadoReserva, v_idMesa);

  RETURN 'Reserva ¨'|| v_idReserva ||'¨ creada satisfactoriamente';

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100