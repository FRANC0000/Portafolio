package com.restaurant.siglo.xxi.clases;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name="plato")

public class Plato {
	@Id
	int id_plato;
	
//	@OneToOne
//	@JoinColumn(name = "id_receta")
//	private Receta receta;
	
	@ManyToOne
	@JoinColumn(name = "id_tipo_plato")
	private TipoPlato tipo_plato;
	
	String nombre_plato;
	int precio_plato;
	int cantidad_personas_recomendadas;
	String descripcion_plato;
	String comentario;
	boolean disponibilidad;
	
	@Column(nullable = true)
	boolean eliminado;
	
	public int getId_plato() {
		return id_plato;
	}
	public void setId_plato(int id_plato) {
		this.id_plato = id_plato;
	}
//	public Receta getReceta() {
//		return receta;
//	}
//	public void setReceta(Receta receta) {
//		this.receta = receta;
//	}
	public TipoPlato getTipo_plato() {
		return tipo_plato;
	}
	public void setTipo_plato(TipoPlato tipo_plato) {
		this.tipo_plato = tipo_plato;
	}
	public String getNombre_plato() {
		return nombre_plato;
	}
	public void setNombre_plato(String nombre_plato) {
		this.nombre_plato = nombre_plato;
	}
	public int getPrecio_plato() {
		return precio_plato;
	}
	public void setPrecio_plato(int precio_plato) {
		this.precio_plato = precio_plato;
	}
	public int getCantidad_personas_recomendadas() {
		return cantidad_personas_recomendadas;
	}
	public void setCantidad_personas_recomendadas(int cantidad_personas_recomendadas) {
		this.cantidad_personas_recomendadas = cantidad_personas_recomendadas;
	}
	public String getDescripcion_plato() {
		return descripcion_plato;
	}
	public void setDescripcion_plato(String descripcion_plato) {
		this.descripcion_plato = descripcion_plato;
	}
	public String getComentario() {
		return comentario;
	}
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	public boolean isDisponibilidad() {
		return disponibilidad;
	}
	public void setDisponibilidad(boolean disponibilidad) {
		this.disponibilidad = disponibilidad;
	}
	public boolean isEliminado() {
		return eliminado;
	}
	public void setEliminado(boolean eliminado) {
		this.eliminado = eliminado;
	}
}
