package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="mesa")
public class Mesa implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	int id_mesa;

	@ManyToOne
	@JoinColumn(name = "id_estado_mesa")
	private EstadoMesa id_estado_mesa;	
	
	@ManyToOne
	@JoinColumn(name = "id_tipo_mesa")
	private TipoMesa id_tipo_mesa;

	public int getId_mesa() {
		return id_mesa;
	}

	public void setId_mesa(int id_mesa) {
		this.id_mesa = id_mesa;
	}

	public EstadoMesa getId_estado_mesa() {
		return id_estado_mesa;
	}

	public void setId_estado_mesa(EstadoMesa id_estado_mesa) {
		this.id_estado_mesa = id_estado_mesa;
	}

	public TipoMesa getId_tipo_mesa() {
		return id_tipo_mesa;
	}

	public void setId_tipo_mesa(TipoMesa id_tipo_mesa) {
		this.id_tipo_mesa = id_tipo_mesa;
	}

}
