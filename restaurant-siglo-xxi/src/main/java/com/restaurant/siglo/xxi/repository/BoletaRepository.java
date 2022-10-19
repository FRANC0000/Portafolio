package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Boleta;

public interface BoletaRepository extends JpaRepository<Boleta, Integer>{
	
	@Query(value = "select nextval('seq_id_boleta')", nativeQuery = true)
	int nextValIdBoleta();
	
	@Query(value = "select crear_boleta(:id_boleta, :descuentos, :extras, :fecha_atencion, :hora_atencion, :hora_emision, :subtotal, :total, :id_cliente, :id_estado_boleta, :id_tipo_pago, :id_usuario)", nativeQuery = true)
	String crearBoleta(@Param("id_boleta") int id_boleta, 
			@Param("descuentos") int descuentos,
			@Param("extras") int extras,
			@Param("fecha_atencion") Timestamp fecha_atencion,
			@Param("hora_atencion") String hora_atencion,
			@Param("hora_emision") String hora_emision,
			@Param("subtotal") int subtotal,
			@Param("total") int total,
			@Param("id_cliente") int id_cliente,
			@Param("id_estado_boleta") int id_estado_boleta,	
			@Param("id_tipo_pago") int id_tipo_pago,
			@Param("id_usuario") String id_usuario);
	
	@Query(name = "obtenerBoletaEnProcesoPorIdCliente", nativeQuery = true)
	List<Boleta> obtenerBoletaEnProcesoPorIdCliente(@Param("id_cliente") int id_cliente);
	
	@Query(value = "select modificar_boleta(:id_boleta, :descuentos, :extras, :fecha_atencion, :hora_atencion, :hora_emision, :subtotal, :total, :id_cliente, :id_estado_boleta, :id_tipo_pago, :id_usuario)", nativeQuery = true)
	String modificarBoleta(@Param("id_boleta") int id_boleta, 
			@Param("descuentos") int descuentos,
			@Param("extras") int extras,
			@Param("fecha_atencion") Timestamp fecha_atencion,
			@Param("hora_atencion") String hora_atencion,
			@Param("hora_emision") String hora_emision,
			@Param("subtotal") int subtotal,
			@Param("total") int total,
			@Param("id_cliente") int id_cliente,
			@Param("id_estado_boleta") int id_estado_boleta,	
			@Param("id_tipo_pago") int id_tipo_pago,
			@Param("id_usuario") String id_usuario);
}
