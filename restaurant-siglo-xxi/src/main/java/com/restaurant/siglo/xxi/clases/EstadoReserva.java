package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="estado_reserva")

public class EstadoReserva {
	@Id
	int id_estado_reserva;
	String nombre_estado_reserva;
	
	public EstadoReserva () {};

	public EstadoReserva(int id_estado_reserva, String nombre_estado_reserva) {
		super();
		this.id_estado_reserva = id_estado_reserva;
		this.nombre_estado_reserva = nombre_estado_reserva;
	}

	public int getId_estado_reserva() {
		return id_estado_reserva;
	}

	public void setId_estado_reserva(int id_estado_reserva) {
		this.id_estado_reserva = id_estado_reserva;
	}

	public String getNombre_estado_reserva() {
		return nombre_estado_reserva;
	}

	public void setNombre_estado_reserva(String nombre_estado_reserva) {
		this.nombre_estado_reserva = nombre_estado_reserva;
	};
	
	
}
