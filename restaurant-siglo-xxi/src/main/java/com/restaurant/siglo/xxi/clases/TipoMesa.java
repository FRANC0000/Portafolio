package com.restaurant.siglo.xxi.clases;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table (name="tipo_mesa")
public class TipoMesa {
	
	@Id
	int id_tipo_mesa;
	String nombre_tipo_mesa;
	int cantidad_asientos;
	
	public int getId_tipo_mesa() {
		return id_tipo_mesa;
	}
	public void setId_tipo_mesa(int id_tipo_mesa) {
		this.id_tipo_mesa = id_tipo_mesa;
	}
	public String getNombre_tipo_mesa() {
		return nombre_tipo_mesa;
	}
	public void setNombre_tipo_mesa(String nombre_tipo_mesa) {
		this.nombre_tipo_mesa = nombre_tipo_mesa;
	}
	public int getCantidad_asientos() {
		return cantidad_asientos;
	}
	public void setCantidad_asientos(int cantidad_asientos) {
		this.cantidad_asientos = cantidad_asientos;
	}
	
	

}
