package com.restaurant.siglo.xxi.clases;


import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table (name="reserva")
@NamedQueries(
		{
			@NamedQuery(
					name = "obtenerReservaActivaPorIdMesa", 
					query = " select r from Reserva r "
							+ " where r.id_mesa.id_mesa = :id_mesa "
							+ " and r.estado_reserva.id_estado_reserva = 1 "				
			)
		})
public class Reserva {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	String id_reserva;
	
	@ManyToOne
	@JoinColumn(name = "id_estado_reserva")
	private EstadoReserva estado_reserva;
	
	@ManyToOne
	@JoinColumn(name = "id_mesa")
	private Mesa id_mesa;
	
	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;
	
	int cant_consumidores;
	Timestamp fecha_reserva;
	String hora_reserva;
	String comentario;
	public String getId_reserva() {
		return id_reserva;
	}
	public void setId_reserva(String id_reserva) {
		this.id_reserva = id_reserva;
	}
	public EstadoReserva getEstado_reserva() {
		return estado_reserva;
	}
	public void setEstado_reserva(EstadoReserva estado_reserva) {
		this.estado_reserva = estado_reserva;
	}
	public Mesa getId_mesa() {
		return id_mesa;
	}
	public void setId_mesa(Mesa id_mesa) {
		this.id_mesa = id_mesa;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public int getCant_consumidores() {
		return cant_consumidores;
	}
	public void setCant_consumidores(int cant_consumidores) {
		this.cant_consumidores = cant_consumidores;
	}
	public Timestamp getFecha_reserva() {
		return fecha_reserva;
	}
	public void setFecha_reserva(Timestamp fecha_reserva) {
		this.fecha_reserva = fecha_reserva;
	}
	public String getHora_reserva() {
		return hora_reserva;
	}
	public void setHora_reserva(String hora_reserva) {
		this.hora_reserva = hora_reserva;
	}
	public String getComentario() {
		return comentario;
	}
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	
	
}
