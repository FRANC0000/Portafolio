package com.restaurant.siglo.xxi.clases;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table (name="estado_mesa")
public class EstadoMesa {
	
	@Id
	int id_estado_mesa;
	String nombre_estado_mesa;
	
	public int getId_estado_mesa() {
		return id_estado_mesa;
	}
	public void setId_estado_mesa(int id_estado_mesa) {
		this.id_estado_mesa = id_estado_mesa;
	}
	public String getNombre_estado_mesa() {
		return nombre_estado_mesa;
	}
	public void setNombre_estado_mesa(String nombre_estado_mesa) {
		this.nombre_estado_mesa = nombre_estado_mesa;
	}
	
	
}
