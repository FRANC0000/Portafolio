package com.restaurant.siglo.xxi.repository;


import java.sql.Timestamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer>{
	
	@Query(value = "select crear_cliente(:rut_cliente, :dv_cliente, :fecha_ingreso, :nombre_cliente) ", nativeQuery = true)
	String crearCliente(@Param("rut_cliente") int rut_cliente, 
			@Param("dv_cliente") String dv_cliente,
			@Param("fecha_ingreso") Timestamp fecha_ingreso,
			@Param("nombre_cliente") String nombre_cliente);
}
