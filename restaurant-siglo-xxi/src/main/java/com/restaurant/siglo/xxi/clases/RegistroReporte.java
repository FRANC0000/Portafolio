package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="registro_reporte")


public class RegistroReporte implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	RegistroReporteId registroReporteId;
	
	String id_usuario_creador;
	
	Timestamp fecha_creacion;
	
	@Column(length = 100000)
	String pdfDefinitions;
	
	
	public RegistroReporteId getRegistroReporteId() {
		return registroReporteId;
	}
	public void setRegistroReporteId(RegistroReporteId registroReporteId) {
		this.registroReporteId = registroReporteId;
	}
	public String getId_usuario_creador() {
		return id_usuario_creador;
	}
	public void setId_usuario_creador(String id_usuario_creador) {
		this.id_usuario_creador = id_usuario_creador;
	}
	public Timestamp getFecha_creacion() {
		return fecha_creacion;
	}
	public void setFecha_creacion(Timestamp fecha_creacion) {
		this.fecha_creacion = fecha_creacion;
	}
	public String getPdfDefinitions() {
		return pdfDefinitions;
	}
	public void setPdfDefinitions(String pdfDefinitions) {
		this.pdfDefinitions = pdfDefinitions;
	}
	
}
