package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="modulo")

public class Modulo {
	@Id
	int id_modulo;
	
	@ManyToOne
	@JoinColumn(name = "id_rol")
	private Rol rol;
	
	String nombre_modulo;
	
	public Modulo() {};
	
	public Modulo(int id_modulo, String nombre_modulo) {
		super();
		this.id_modulo = id_modulo;
		this.nombre_modulo = nombre_modulo;
	}

	public int getId_modulo() {
		return id_modulo;
	}

	public void setId_modulo(int id_modulo) {
		this.id_modulo = id_modulo;
	}

	public String getNombre_modulo() {
		return nombre_modulo;
	}

	public void setNombre_modulo(String nombre_modulo) {
		this.nombre_modulo = nombre_modulo;
	}
}


