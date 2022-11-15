package com.restaurant.siglo.xxi.clases;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table (name="cartera_pagos")
@NamedQueries(
		{
			@NamedQuery(
					name = "obtenerCarteraPagoPorIdCliente", 
					query = " select cp from CarteraPagos cp where cp.id_cliente = :id_cliente"
			)
		})
public class CarteraPagos {
	
	@Id
	int id_cartera_pagos;
	
	int id_cliente;
	
	String nro_tarjeta;
	
	int mes_exp;
	
	int anno_exp;
	
	int cvv;
	
	String email;
	
	String nombre_titular;
	
	String rut_titular;

	public int getId_cartera_pagos() {
		return id_cartera_pagos;
	}

	public void setId_cartera_pagos(int id_cartera_pagos) {
		this.id_cartera_pagos = id_cartera_pagos;
	}

	public int getId_cliente() {
		return id_cliente;
	}

	public void setId_cliente(int id_cliente) {
		this.id_cliente = id_cliente;
	}


	public String getNro_tarjeta() {
		return nro_tarjeta;
	}

	public void setNro_tarjeta(String nro_tarjeta) {
		this.nro_tarjeta = nro_tarjeta;
	}

	public int getMes_exp() {
		return mes_exp;
	}

	public void setMes_exp(int mes_exp) {
		this.mes_exp = mes_exp;
	}

	public int getAnno_exp() {
		return anno_exp;
	}

	public void setAnno_exp(int anno_exp) {
		this.anno_exp = anno_exp;
	}

	public int getCvv() {
		return cvv;
	}

	public void setCvv(int cvv) {
		this.cvv = cvv;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getNombre_titular() {
		return nombre_titular;
	}

	public void setNombre_titular(String nombre_titular) {
		this.nombre_titular = nombre_titular;
	}

	public String getRut_titular() {
		return rut_titular;
	}

	public void setRut_titular(String rut_titular) {
		this.rut_titular = rut_titular;
	}
	
	
	

}
