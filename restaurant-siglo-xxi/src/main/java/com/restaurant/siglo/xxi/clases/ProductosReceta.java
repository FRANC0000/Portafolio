package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table (name="productos_receta")
@NamedQueries(
		{
			@NamedQuery(
					name = "obtenerProductosDeUnaReceta", 
					query = " select p from ProductosReceta p "
							+ " where p.productosRecetaId.id_receta = :id_receta "				
			)
		})
public class ProductosReceta implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	ProductosRecetaId productosRecetaId;
	
	private int cantidad_producto;
	
	private String comentario;

	public ProductosRecetaId getProductosRecetaId() {
		return productosRecetaId;
	}

	public void setProductosRecetaId(ProductosRecetaId productosRecetaId) {
		this.productosRecetaId = productosRecetaId;
	}

	public int getCantidad_producto() {
		return cantidad_producto;
	}

	public void setCantidad_producto(int cantidad_producto) {
		this.cantidad_producto = cantidad_producto;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	
}
