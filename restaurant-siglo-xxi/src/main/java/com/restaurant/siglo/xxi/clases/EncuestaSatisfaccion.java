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
@Table (name = "encuesta_satisfaccion")

public class EncuestaSatisfaccion {
	@Id
	int id_encuesta;
	int puntuacion_comida;
	int puntuacion_tiempo_atencion;
	int puntuacion_trato_del_personal;
	int puntuacion_interaccion_sistema;
	Boolean recomendado;
	Boolean vuelta;
	
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

	public int getPuntuacion_comida() {
		return puntuacion_comida;
	}

	public void setPuntuacion_comida(int puntuacion_comida) {
		this.puntuacion_comida = puntuacion_comida;
	}

	public int getPuntuacion_tiempo_atencion() {
		return puntuacion_tiempo_atencion;
	}

	public void setPuntuacion_tiempo_atencion(int puntuacion_tiempo_atencion) {
		this.puntuacion_tiempo_atencion = puntuacion_tiempo_atencion;
	}

	public int getPuntuacion_trato_del_personal() {
		return puntuacion_trato_del_personal;
	}

	public void setPuntuacion_trato_del_personal(int puntuacion_trato_del_personal) {
		this.puntuacion_trato_del_personal = puntuacion_trato_del_personal;
	}

	public int getPuntuacion_interaccion_sistema() {
		return puntuacion_interaccion_sistema;
	}

	public void setPuntuacion_interaccion_sistema(int puntuacion_interaccion_sistema) {
		this.puntuacion_interaccion_sistema = puntuacion_interaccion_sistema;
	}

	public Boolean getRecomendado() {
		return recomendado;
	}

	public void setRecomendado(Boolean recomendado) {
		this.recomendado = recomendado;
	}

	public Boolean getVuelta() {
		return vuelta;
	}

	public void setVuelta(Boolean vuelta) {
		this.vuelta = vuelta;
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
