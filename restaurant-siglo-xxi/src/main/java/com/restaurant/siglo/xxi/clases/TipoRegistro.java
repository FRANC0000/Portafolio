package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="tipo_registro")
public class TipoRegistro{
	
	@Id
	int id_tipo_registro;
	String nombre_tipo_registro;
	public int getId_tipo_registro() {
		return id_tipo_registro;
	}
	public void setId_tipo_registro(int id_tipo_registro) {
		this.id_tipo_registro = id_tipo_registro;
	}
	public String getNombre_tipo_registro() {
		return nombre_tipo_registro;
	}
	public void setNombre_tipo_registro(String nombre_tipo_registro) {
		this.nombre_tipo_registro = nombre_tipo_registro;
	}

}
