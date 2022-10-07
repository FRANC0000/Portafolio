package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.Column;

public class RegistroReporteId implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column
	private int id_registro;
	
	@Column
	private int id_reporte;

	public int getId_registro() {
		return id_registro;
	}

	public void setId_registro(int id_registro) {
		this.id_registro = id_registro;
	}

	public int getId_reporte() {
		return id_reporte;
	}

	public void setId_reporte(int id_reporte) {
		this.id_reporte = id_reporte;
	}
	

}
