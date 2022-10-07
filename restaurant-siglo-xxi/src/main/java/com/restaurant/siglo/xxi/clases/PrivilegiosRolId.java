package com.restaurant.siglo.xxi.clases;

import java.io.Serializable;

import javax.persistence.Column;

public class PrivilegiosRolId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Column
	private int id_privilegio;
	
	@Column
	private int id_rol;

}
