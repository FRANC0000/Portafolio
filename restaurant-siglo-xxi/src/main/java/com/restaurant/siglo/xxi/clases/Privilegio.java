package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="privilegio")

public class Privilegio implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	int id_privilegio;
	String nombre_privilegio;
	
	public int getId_privilegio() {
		return id_privilegio;
	}

	public void setId_privilegio(int id_privilegio) {
		this.id_privilegio = id_privilegio;
	}

	public String getNombre_privilegio() {
		return nombre_privilegio;
	}

	public void setNombre_privilegio(String nombre_privilegio) {
		this.nombre_privilegio = nombre_privilegio;
	}
	
	
}
