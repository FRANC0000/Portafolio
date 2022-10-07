package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="estado_instancia")

public class EstadoInstancia {
	
	@Id
	int id_estado_instancia;
	String nombre_estado_instancia;
	
	public EstadoInstancia() {};
	
	public EstadoInstancia(int id_estado_instancia, String nombre_estado_instancia) {
		super();
		this.id_estado_instancia = id_estado_instancia;
		this.nombre_estado_instancia = nombre_estado_instancia;
	}

	public int getId_estado_instancia() {
		return id_estado_instancia;
	}

	public void setId_estado_instancia(int id_estado_instancia) {
		this.id_estado_instancia = id_estado_instancia;
	}

	public String getNombre_estado_instancia() {
		return nombre_estado_instancia;
	}

	public void setNombre_estado_instancia(String nombre_estado_instancia) {
		this.nombre_estado_instancia = nombre_estado_instancia;
	}
	
	
	
	
	
	
	
	
	
}
