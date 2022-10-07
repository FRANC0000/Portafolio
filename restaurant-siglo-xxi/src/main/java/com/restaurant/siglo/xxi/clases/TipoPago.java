package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="tipo_pago")
public class TipoPago {
	@Id
	int id_tipo_pago;
	String nombre_tipo_pago;
	String comentario;
	
	public TipoPago() {};
	
	public TipoPago(int id_tipo_pago, String nombre_tipo_pago, String comentario) {
		super();
		this.id_tipo_pago = id_tipo_pago;
		this.nombre_tipo_pago = nombre_tipo_pago;
		this.comentario = comentario;		
	}

	public int getId_tipo_pago() {
		return id_tipo_pago;
	}

	public void setId_tipo_pago(int id_tipo_pago) {
		this.id_tipo_pago = id_tipo_pago;
	}

	public String getNombre_tipo_pago() {
		return nombre_tipo_pago;
	}

	public void setNombre_tipo_pago(String nombre_tipo_pago) {
		this.nombre_tipo_pago = nombre_tipo_pago;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	
	
}
