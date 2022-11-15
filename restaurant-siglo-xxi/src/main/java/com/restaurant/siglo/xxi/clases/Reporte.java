package com.restaurant.siglo.xxi.clases;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="reporte")

public class Reporte {
	@Id 
	int id_reporte;
	
	@ManyToOne
	@JoinColumn(name = "id_tipo_reporte")
	private TipoReporte tipo_reporte;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	
	String titulo_reporte;
	String comentario;
	Timestamp fecha_creacion;
	String nombre_creacion;
	String extension;
	
	@Column(nullable = true)
	boolean eliminado;
	
	public Reporte() {};
	
	public Reporte(int id_reporte, String titulo_reporte, String comentario, Timestamp fecha_creacion, String nombre_creacion,
			String extension) {
		super();
		this.id_reporte = id_reporte;
		this.titulo_reporte = titulo_reporte;
		this.comentario = comentario;
		this.fecha_creacion = fecha_creacion;
		this.nombre_creacion = nombre_creacion;
		this.extension = extension;		
	}

	public int getId_reporte() {
		return id_reporte;
	}

	public void setId_reporte(int id_reporte) {
		this.id_reporte = id_reporte;
	}

	public String getTitulo_reporte() {
		return titulo_reporte;
	}

	public void setTitulo_reporte(String titulo_reporte) {
		this.titulo_reporte = titulo_reporte;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Timestamp getFecha_creacion() {
		return fecha_creacion;
	}

	public void setFecha_creacion(Timestamp fecha_creacion) {
		this.fecha_creacion = fecha_creacion;
	}

	public String getNombre_creacion() {
		return nombre_creacion;
	}

	public void setNombre_creacion(String nombre_creacion) {
		this.nombre_creacion = nombre_creacion;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}
	public boolean isEliminado() {
		return eliminado;
	}

	public void setEliminado(boolean eliminado) {
		this.eliminado = eliminado;
	}

	public TipoReporte getTipo_reporte() {
		return tipo_reporte;
	}

	public void setTipo_reporte(TipoReporte tipo_reporte) {
		this.tipo_reporte = tipo_reporte;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}
