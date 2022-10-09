package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table (name="receta")

public class Receta {
	@Id
	int id_receta;
	String comentario;
	int tiempo_preparacion;
	String complejidad;
	
//	@OneToOne
//	@JoinColumn(name = "id_plato")
//	private Plato plato;

	public int getId_receta() {
		return id_receta;
	}

	public void setId_receta(int id_receta) {
		this.id_receta = id_receta;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public int getTiempo_preparacion() {
		return tiempo_preparacion;
	}

	public void setTiempo_preparacion(int tiempo_preparacion) {
		this.tiempo_preparacion = tiempo_preparacion;
	}

	public String getComplejidad() {
		return complejidad;
	}

	public void setComplejidad(String complejidad) {
		this.complejidad = complejidad;
	}

//	public Plato getPlato() {
//		return plato;
//	}
//
//	public void setPlato(Plato plato) {
//		this.plato = plato;
//	}
//	
}
