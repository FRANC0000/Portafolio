package com.restaurant.siglo.xxi.clases;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name = "encuesta_cancelacion")

public class EncuestaCancelacion {
	@Id
	int id_encuesta;
	String motivo;
	int puntuacion_atencion;
	String comentario;
	Timestamp fecha_encuesta; 
	
	@OneToOne
	@JoinColumn(name = "id_reserva", nullable = true)
	private Reserva reserva;

	public int getId_encuesta() {
		return id_encuesta;
	}

	public void setId_encuesta(int id_encuesta) {
		this.id_encuesta = id_encuesta;
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}

	public int getPuntuacion_atencion() {
		return puntuacion_atencion;
	}

	public void setPuntuacion_atencion(int puntuacion_atencion) {
		this.puntuacion_atencion = puntuacion_atencion;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Timestamp getFecha_encuesta() {
		return fecha_encuesta;
	}

	public void setFecha_encuesta(Timestamp fecha_encuesta) {
		this.fecha_encuesta = fecha_encuesta;
	}

	public Reserva getReserva() {
		return reserva;
	}

	public void setReserva(Reserva reserva) {
		this.reserva = reserva;
	}


	
	
}
