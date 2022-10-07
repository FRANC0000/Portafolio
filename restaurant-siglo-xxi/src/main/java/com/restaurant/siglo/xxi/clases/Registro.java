package com.restaurant.siglo.xxi.clases;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="registro")

public class Registro {
	@Id
	int id_registro;
	
	@ManyToOne
	@JoinColumn(name = "id_tipo_registro")
	private TipoRegistro tipo_registro;
	
	@ManyToOne
	@JoinColumn(name = "id_estado_registro")
	private EstadoRegistro estado_registro;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	
	@ManyToOne
	@JoinColumn(name = "id_modulo")
	private Modulo modulo;
	
	
	
	String titulo_registro;
	String descripcion;
	Timestamp fecha_instancia;
	Timestamp hora_instancia;
	
	public Registro() {};
	
	public Registro(int id_registro, String titulo_registro, String descripcion, Timestamp fecha_instancia, Timestamp hora_instancia) {
		super();
		this.id_registro = id_registro;
		this.titulo_registro = titulo_registro;
		this.descripcion = descripcion;
		this.fecha_instancia = fecha_instancia;
		this.hora_instancia = hora_instancia;
	}

	public int getId_registro() {
		return id_registro;
	}

	public void setId_registro(int id_registro) {
		this.id_registro = id_registro;
	}

	public String getTitulo_registro() {
		return titulo_registro;
	}

	public void setTitulo_registro(String titulo_registro) {
		this.titulo_registro = titulo_registro;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Timestamp getFecha_instancia() {
		return fecha_instancia;
	}

	public void setFecha_instancia(Timestamp fecha_instancia) {
		this.fecha_instancia = fecha_instancia;
	}

	public Timestamp getHora_instancia() {
		return hora_instancia;
	}

	public void setHora_instancia(Timestamp hora_instancia) {
		this.hora_instancia = hora_instancia;
	}	
}
