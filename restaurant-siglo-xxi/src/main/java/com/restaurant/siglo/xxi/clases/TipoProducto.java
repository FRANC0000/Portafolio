package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="tipo_producto")

public class TipoProducto {
	@Id
	int id_tipo_producto;
	String nombre_tipo_producto;
	String comentario;
	
	public TipoProducto() {};

	public TipoProducto(int id_tipo_producto, String nombre_tipo_producto, String comentario) {
		super();
		this.id_tipo_producto = id_tipo_producto;
		this.nombre_tipo_producto = nombre_tipo_producto;
		this.comentario = comentario;
	}

	public int getId_tipo_producto() {
		return id_tipo_producto;
	}

	public void setId_tipo_producto(int id_tipo_producto) {
		this.id_tipo_producto = id_tipo_producto;
	}

	public String getNombre_tipo_producto() {
		return nombre_tipo_producto;
	}

	public void setNombre_tipo_producto(String nombre_tipo_producto) {
		this.nombre_tipo_producto = nombre_tipo_producto;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	};
	
	
}
