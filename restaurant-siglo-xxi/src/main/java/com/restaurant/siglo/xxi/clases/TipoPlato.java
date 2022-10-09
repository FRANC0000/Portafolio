package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="tipo_plato")
public class TipoPlato {
	@Id
	int id_tipo_plato;
	String nombre_tipo_plato;
	String descripcion_tipo_plato;

	public int getId_tipo_plato() {
		return id_tipo_plato;
	}

	public void setId_tipo_plato(int id_tipo_plato) {
		this.id_tipo_plato = id_tipo_plato;
	}

	public String getNombre_tipo_plato() {
		return nombre_tipo_plato;
	}

	public void setNombre_tipo_plato(String nombre_tipo_plato) {
		this.nombre_tipo_plato = nombre_tipo_plato;
	}

	public String getDescripcion() {
		return descripcion_tipo_plato;
	}

	public void setDescripcion(String descripcion_tipo_plato) {
		this.descripcion_tipo_plato = descripcion_tipo_plato;
	};
	
	
}
