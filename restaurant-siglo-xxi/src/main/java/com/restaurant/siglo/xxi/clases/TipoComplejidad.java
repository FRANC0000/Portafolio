package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="tipo_complejidad")
public class TipoComplejidad {
	
	@Id
	int id_tipo_complejidad;
	
	String nombre_tipo_complejidad;
	
	String descripcion_tipo_complejidad;

	public int getId_tipo_complejidad() {
		return id_tipo_complejidad;
	}

	public void setId_tipo_complejidad(int id_tipo_complejidad) {
		this.id_tipo_complejidad = id_tipo_complejidad;
	}

	public String getNombre_tipo_complejidad() {
		return nombre_tipo_complejidad;
	}

	public void setNombre_tipo_complejidad(String nombre_tipo_complejidad) {
		this.nombre_tipo_complejidad = nombre_tipo_complejidad;
	}

	public String getDescripcion_tipo_complejidad() {
		return descripcion_tipo_complejidad;
	}

	public void setDescripcion_tipo_complejidad(String descripcion_tipo_complejidad) {
		this.descripcion_tipo_complejidad = descripcion_tipo_complejidad;
	}
	
	
	

}
