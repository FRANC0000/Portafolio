package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Transaccion;


public interface TransaccionRepository extends JpaRepository<Transaccion, String>{
	
	//rut_cliente integer,fecha_emision timestamp,id_boleta integer,valor integer,id_cartera_pago integer
	
	@Query(value = "select crear_transaccion(:rut_cliente, :fecha_emision, :id_boleta, :valor, :id_cartera_pago)", nativeQuery = true)
	String crearTransaccion(@Param("rut_cliente") int rut_cliente, 
			@Param("fecha_emision") Timestamp fecha_emision,
			@Param("id_boleta") int id_boleta,
			@Param("valor") int valor,
			@Param("id_cartera_pago") int id_cartera_pago);
	
	@Query(name = "obtenerTransaccionPorIdBoleta", nativeQuery = true)
	Transaccion obtenerTransaccionPorIdBoleta(@Param("id_boleta") int id_boleta);
}
