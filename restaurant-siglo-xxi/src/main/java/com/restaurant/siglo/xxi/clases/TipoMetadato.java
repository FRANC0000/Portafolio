package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="tipo_metadato")
public class TipoMetadato {
	@Id
	int id_tipo_metadato;
	String nombre_tipo_metadato;

	public int getId_tipo_metadato() {
		return id_tipo_metadato;
	}

	public void setId_tipo_metadato(int id_tipo_metadato) {
		this.id_tipo_metadato = id_tipo_metadato;
	}

	public String getNombre_tipo_metadato() {
		return nombre_tipo_metadato;
	}

	public void setNombre_tipo_metadato(String nombre_tipo_metadato) {
		this.nombre_tipo_metadato = nombre_tipo_metadato;
	};
	
	
}
