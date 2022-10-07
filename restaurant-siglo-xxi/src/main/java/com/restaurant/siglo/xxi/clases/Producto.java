package com.restaurant.siglo.xxi.clases;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table (name="producto")

public class Producto {
	@Id
	int id_producto;
	String nombre_producto;
	int stock_producto;
	String medida_producto;
	Timestamp fecha_vencimiento;
	int valor_unitario;
	
	@ManyToOne
	@JoinColumn(name = "tipo_producto")
	private TipoProducto tipoProducto;
	
	String comentario;
	Timestamp fecha_ingreso_producto;
	public int getId_producto() {
		return id_producto;
	}
	public void setId_producto(int id_producto) {
		this.id_producto = id_producto;
	}
	public String getNombre_producto() {
		return nombre_producto;
	}
	public void setNombre_producto(String nombre_producto) {
		this.nombre_producto = nombre_producto;
	}
	public int getStock_producto() {
		return stock_producto;
	}
	public void setStock_producto(int stock_producto) {
		this.stock_producto = stock_producto;
	}
	public String getMedida_producto() {
		return medida_producto;
	}
	public void setMedida_producto(String medida_producto) {
		this.medida_producto = medida_producto;
	}
	public Timestamp getFecha_vencimiento() {
		return fecha_vencimiento;
	}
	public void setFecha_vencimiento(Timestamp fecha_vencimiento) {
		this.fecha_vencimiento = fecha_vencimiento;
	}
	public int getValor_unitario() {
		return valor_unitario;
	}
	public void setValor_unitario(int valor_unitario) {
		this.valor_unitario = valor_unitario;
	}
	public TipoProducto getTipoProducto() {
		return tipoProducto;
	}
	public void setTipoProducto(TipoProducto tipoProducto) {
		this.tipoProducto = tipoProducto;
	}
	public String getComentario() {
		return comentario;
	}
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	public Timestamp getFecha_ingreso_producto() {
		return fecha_ingreso_producto;
	}
	public void setFecha_ingreso_producto(Timestamp fecha_ingreso_producto) {
		this.fecha_ingreso_producto = fecha_ingreso_producto;
	}
	
	
}
