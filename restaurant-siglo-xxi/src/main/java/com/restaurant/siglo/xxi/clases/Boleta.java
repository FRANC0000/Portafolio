package com.restaurant.siglo.xxi.clases;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="boleta")
public class Boleta {
	@Id
	int id_boleta;
	
	@ManyToOne
	@JoinColumn(name = "cliente")
	private Cliente cliente;	
	
	@ManyToOne
	@JoinColumn(name = "usuario")
	private Usuario usuario;	
	
	@ManyToOne
	@JoinColumn(name = "tipo_pago")
	private TipoPago tipoPago;	
	
	Timestamp fecha_atencion;
	Timestamp hora_atencion;
	String hora_emision;
	int subtotal;
	int total;
	int descuentos;
	int extras;
	public int getId_boleta() {
		return id_boleta;
	}
	public void setId_boleta(int id_boleta) {
		this.id_boleta = id_boleta;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public TipoPago getTipoPago() {
		return tipoPago;
	}
	public void setTipoPago(TipoPago tipoPago) {
		this.tipoPago = tipoPago;
	}
	public Timestamp getFecha_atencion() {
		return fecha_atencion;
	}
	public void setFecha_atencion(Timestamp fecha_atencion) {
		this.fecha_atencion = fecha_atencion;
	}
	public Timestamp getHora_atencion() {
		return hora_atencion;
	}
	public void setHora_atencion(Timestamp hora_atencion) {
		this.hora_atencion = hora_atencion;
	}
	public String getHora_emision() {
		return hora_emision;
	}
	public void setHora_emision(String hora_emision) {
		this.hora_emision = hora_emision;
	}
	public int getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(int subtotal) {
		this.subtotal = subtotal;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public int getDescuentos() {
		return descuentos;
	}
	public void setDescuentos(int descuentos) {
		this.descuentos = descuentos;
	}
	public int getExtras() {
		return extras;
	}
	public void setExtras(int extras) {
		this.extras = extras;
	}
}
