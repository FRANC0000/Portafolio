package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="estadoregistro")


public class EstadoRegistro {

	@Id
	int id_estado_registro;
	String nombre_estado_registro;
	
	public EstadoRegistro() {};
	
	public EstadoRegistro(int id_estado_registro, String nombre_estado_registro ) {
		super();
		this.id_estado_registro= id_estado_registro;
		this.nombre_estado_registro = nombre_estado_registro;
	}
	public int getId_estado_registro() {
		return id_estado_registro;
	}
	public void setId_estado_registro(int id_estado_registro) {
		this.id_estado_registro = id_estado_registro;
	}
	public String getNombre_estado_registro() {
		return nombre_estado_registro;
	}
	public void setNombre_estado_registro(String nombre_estado_registro) {
		this.nombre_estado_registro = nombre_estado_registro;
	

    }
}
