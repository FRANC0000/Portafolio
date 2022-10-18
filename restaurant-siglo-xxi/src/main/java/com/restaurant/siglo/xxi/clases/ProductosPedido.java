package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table (name="productos_pedido")
@NamedQueries(
		{
			@NamedQuery(
					name = "obtenerProductosPorIdPedido", 
					query = " select pp from ProductosPedido pp "
							+ " where pp.productosPedidoId.id_pedido = :id_pedido "				
			)
		})
public class ProductosPedido implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	ProductosPedidoId productosPedidoId;
	
	private int cantidad_producto;

	public ProductosPedidoId getProductosPedidoId() {
		return productosPedidoId;
	}

	public void setProductosPedidoId(ProductosPedidoId productosPedidoId) {
		this.productosPedidoId = productosPedidoId;
	}

	public int getCantidad_producto() {
		return cantidad_producto;
	}

	public void setCantidad_producto(int cantidad_producto) {
		this.cantidad_producto = cantidad_producto;
	}
	
	

}
