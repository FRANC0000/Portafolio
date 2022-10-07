package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="tipo_reporte")

public class TipoReporte {
	@Id
	int id_tipo_reporte;
	String nombre_tipo_reporte;
	
	public TipoReporte() {};

	public TipoReporte(int id_tipo_reporte, String nombre_tipo_reporte) {
		super();
		this.id_tipo_reporte = id_tipo_reporte;
		this.nombre_tipo_reporte = nombre_tipo_reporte;
	}

	public int getId_tipo_reporte() {
		return id_tipo_reporte;
	}

	public void setId_tipo_reporte(int id_tipo_reporte) {
		this.id_tipo_reporte = id_tipo_reporte;
	}

	public String getNombre_tipo_reporte() {
		return nombre_tipo_reporte;
	}

	public void setNombre_tipo_reporte(String nombre_tipo_reporte) {
		this.nombre_tipo_reporte = nombre_tipo_reporte;
	};	
}
