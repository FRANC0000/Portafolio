package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="valor_metadato_registro")


public class ValorMetadatoRegistro implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@EmbeddedId
	private ValorMetadatoRegistroId valorMetadatoRegistroId;
	String valor;
	
	public ValorMetadatoRegistroId getValorMetadatoRegistroId() {
		return valorMetadatoRegistroId;
	}
	public void setValorMetadatoRegistroId(ValorMetadatoRegistroId valorMetadatoRegistroId) {
		this.valorMetadatoRegistroId = valorMetadatoRegistroId;
	}
	public String getValor() {
		return valor;
	}
	public void setValor(String valor) {
		this.valor = valor;
	}
	
}
