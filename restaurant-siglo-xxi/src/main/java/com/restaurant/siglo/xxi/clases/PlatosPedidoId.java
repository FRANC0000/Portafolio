package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class PlatosPedidoId implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column(name="id_pedido")
	private int id_pedido;

	@Column(name="id_plato")
	private int id_plato;

	public int getId_pedido() {
		return id_pedido;
	}

	public void setId_pedido(int id_pedido) {
		this.id_pedido = id_pedido;
	}

	public int getId_plato() {
		return id_plato;
	}

	public void setId_plato(int id_plato) {
		this.id_plato = id_plato;
	}	
	
	

}
