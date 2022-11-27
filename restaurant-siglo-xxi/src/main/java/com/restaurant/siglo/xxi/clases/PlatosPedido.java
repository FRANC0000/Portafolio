package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table (name="platos_pedido")
@NamedQueries(
		{
			@NamedQuery(
					name = "obtenerPlatosPedidoPorIdCompuesto", 
					query = " select pp from PlatosPedido pp "
							+ " where pp.platosPedidoId.id_pedido = :id_pedido "
							+ " and pp.platosPedidoId.id_plato = :id_plato "				
			),
			@NamedQuery(
					name = "obtenerPlatosPorIdPedido", 
					query = " select pp from PlatosPedido pp "
							+ " where pp.platosPedidoId.id_pedido = :id_pedido "				
			)
		})
public class PlatosPedido implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	PlatosPedidoId platosPedidoId;
	
	int cantidad_platos;
	
	@Column(nullable = true)
	String recetas_pedidas;

	public PlatosPedidoId getPlatosPedidoId() {
		return platosPedidoId;
	}

	public void setPlatosPedidoId(PlatosPedidoId platosPedidoId) {
		this.platosPedidoId = platosPedidoId;
	}

	public int getCantidad_platos() {
		return cantidad_platos;
	}

	public void setCantidad_platos(int cantidad_platos) {
		this.cantidad_platos = cantidad_platos;
	}

	public String getRecetas_pedidas() {
		return recetas_pedidas;
	}

	public void setRecetas_pedidas(String recetas_pedidas) {
		this.recetas_pedidas = recetas_pedidas;
	}
	
}
