package com.restaurant.siglo.xxi.clases;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table (name="transaccion")
@NamedQueries(
		{
			@NamedQuery(
					name = "obtenerTransaccionPorIdBoleta", 
					query = "select t from Transaccion t where t.id_boleta = :id_boleta"
			)
		})
public class Transaccion {
	
	@Id
	int id_transaccion;
	
	int id_cliente;
	
	Timestamp fecha_emision;
	
	int id_boleta;
	
	int valor;
	
	int id_cartera_pagos;

	public int getId_transaccion() {
		return id_transaccion;
	}

	public void setId_transaccion(int id_transaccion) {
		this.id_transaccion = id_transaccion;
	}

	public int getId_cliente() {
		return id_cliente;
	}

	public void setId_cliente(int id_cliente) {
		this.id_cliente = id_cliente;
	}

	public Timestamp getFecha_emision() {
		return fecha_emision;
	}

	public void setFecha_emision(Timestamp fecha_emision) {
		this.fecha_emision = fecha_emision;
	}

	public int getId_boleta() {
		return id_boleta;
	}

	public void setId_boleta(int id_boleta) {
		this.id_boleta = id_boleta;
	}

	public int getValor() {
		return valor;
	}

	public void setValor(int valor) {
		this.valor = valor;
	}

	public int getId_cartera_pagos() {
		return id_cartera_pagos;
	}

	public void setId_cartera_pagos(int id_cartera_pagos) {
		this.id_cartera_pagos = id_cartera_pagos;
	}
	
	
}
