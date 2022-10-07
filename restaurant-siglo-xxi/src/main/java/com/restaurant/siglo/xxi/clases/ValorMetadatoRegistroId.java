package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ValorMetadatoRegistroId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Column(name = "id_metadato")
	private int id_metadato;
	
	@Column(name = "id_registro")
	private int id_registro;

	public int getId_metadato() {
		return id_metadato;
	}

	public void setId_metadato(int id_metadato) {
		this.id_metadato = id_metadato;
	}

	public int getId_registro() {
		return id_registro;
	}

	public void setId_registro(int id_registro) {
		this.id_registro = id_registro;
	}

		
	
}
