package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;

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
	Date fecha_creacion;
	Time hora_creacion;
	int id_modulo_creador;
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
	public Date getFecha_creacion() {
		return fecha_creacion;
	}
	public void setFecha_creacion(Date fecha_creacion) {
		this.fecha_creacion = fecha_creacion;
	}
	public Time getHora_creacion() {
		return hora_creacion;
	}
	public void setHora_creacion(Time hora_creacion) {
		this.hora_creacion = hora_creacion;
	}
	public int getId_modulo_creador() {
		return id_modulo_creador;
	}
	public void setId_modulo_creador(int id_modulo_creador) {
		this.id_modulo_creador = id_modulo_creador;
	}

}
