package com.restaurant.siglo.xxi.clases;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table (name="registro")
@NamedQueries(
		{
			@NamedQuery(
					name = "obtenerSolicitudReabastecimiento", 
					query = " select r from Registro r "
							+ "where r.estado_registro.id_estado_registro = 2 "
			),
			@NamedQuery(
					name = "obtenerSolicitudReabastecimientoFinanzas", 
					query = " select r from Registro r "
							+ "where r.estado_registro.id_estado_registro = 3 "
			),
			@NamedQuery(
					name = "obtenerSolicitudReabastecimientoAprobada", 
					query = " select r from Registro r "
							+ "where r.estado_registro.id_estado_registro = 4 "
			),
			@NamedQuery(
					name = "obtenerSolicitudReabastecimientoRechazada", 
					query = " select r from Registro r "
							+ "where r.estado_registro.id_estado_registro = 5 "
			),
			@NamedQuery(
					name = "obtenerSolicitudReabastecimientoProveedores", 
					query = " select r from Registro r "
							+ "where r.estado_registro.id_estado_registro = 6 "
			),
			@NamedQuery(
					name = "obtenerSolicitudReabastecimientoModificada", 
					query = " select r from Registro r "
							+ "where r.estado_registro.id_estado_registro = 7 "
					)
		})
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
	String hora_instancia;
	boolean eliminado;
	
	@Column(nullable=true)
	int version;
	
	@Column(nullable=true)
	int id_registro_padre;
	
	@Column(nullable=true)
	int id_reporte;
	
	@Column(nullable=true)
	boolean ultima_version;

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

	public TipoRegistro getTipo_registro() {
		return tipo_registro;
	}

	public void setTipo_registro(TipoRegistro tipo_registro) {
		this.tipo_registro = tipo_registro;
	}

	public EstadoRegistro getEstado_registro() {
		return estado_registro;
	}

	public void setEstado_registro(EstadoRegistro estado_registro) {
		this.estado_registro = estado_registro;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Modulo getModulo() {
		return modulo;
	}

	public void setModulo(Modulo modulo) {
		this.modulo = modulo;
	}

	public String getHora_instancia() {
		return hora_instancia;
	}

	public void setHora_instancia(String hora_instancia) {
		this.hora_instancia = hora_instancia;
	}

	public boolean isEliminado() {
		return eliminado;
	}

	public void setEliminado(boolean eliminado) {
		this.eliminado = eliminado;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public int getId_registro_padre() {
		return id_registro_padre;
	}

	public void setId_registro_padre(int id_registro_padre) {
		this.id_registro_padre = id_registro_padre;
	}

	public int getId_reporte() {
		return id_reporte;
	}

	public void setId_reporte(int id_reporte) {
		this.id_reporte = id_reporte;
	}

	public boolean isUltima_version() {
		return ultima_version;
	}

	public void setUltima_version(boolean ultima_version) {
		this.ultima_version = ultima_version;
	}
	
}
