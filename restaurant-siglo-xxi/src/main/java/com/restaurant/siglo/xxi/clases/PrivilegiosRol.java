package com.restaurant.siglo.xxi.clases;

import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="privilegios_rol")


public class PrivilegiosRol {
	@EmbeddedId
	PrivilegiosRolId privilegiosRolId;

	public PrivilegiosRolId getPrivilegiosRolId() {
		return privilegiosRolId;
	}

	public void setPrivilegiosRolId(PrivilegiosRolId privilegiosRolId) {
		this.privilegiosRolId = privilegiosRolId;
	}
	
}
