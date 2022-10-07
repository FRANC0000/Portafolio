package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="metadato")

public class Metadato {
	@Id
	int id_metadato;
	String nombre_metadato;
	
	@ManyToOne
	@JoinColumn(name = "id_tipo_metadato")
	private TipoMetadato id_tipo_metadato;
	
	public Metadato() {};

	public Metadato(int id_metadato, String nombre_metadato) {
		super();
		this.id_metadato = id_metadato;
		this.nombre_metadato = nombre_metadato;
	}

	public int getId_metadato() {
		return id_metadato;
	}

	public void setId_metadato(int id_metadato) {
		this.id_metadato = id_metadato;
	}

	public String getNombre_metadato() {
		return nombre_metadato;
	}

	public void setNombre_metadato(String nombre_metadato) {
		this.nombre_metadato = nombre_metadato;
	};
	
	
	
}
