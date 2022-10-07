package com.restaurant.siglo.xxi.clases;


import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="reserva")

public class Reserva {
	
	@Id
	String id_reserva;
	
	@ManyToOne
	@JoinColumn(name = "estado_reserva")
	private EstadoReserva estado_reserva;
	
	@ManyToOne
	@JoinColumn(name = "id_mesa")
	private Mesa id_mesa;
	
	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;
	
	String dv_cliente;
	int cant_consumidores;
	Timestamp fecha_reserva;
	Timestamp hora_reserva;
	String comentario;

	
}
