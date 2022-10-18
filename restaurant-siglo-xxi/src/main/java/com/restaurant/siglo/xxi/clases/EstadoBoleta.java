package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="estado_boleta")
public class EstadoBoleta {
	@Id
	int id_estado_boleta;
	
	String nombre_estado_boleta;

	public int getId_estado_boleta() {
		return id_estado_boleta;
	}

	public void setId_estado_boleta(int id_estado_boleta) {
		this.id_estado_boleta = id_estado_boleta;
	}

	public String getNombre_estado_boleta() {
		return nombre_estado_boleta;
	}

	public void setNombre_estado_boleta(String nombre_estado_boleta) {
		this.nombre_estado_boleta = nombre_estado_boleta;
	}
	
}
