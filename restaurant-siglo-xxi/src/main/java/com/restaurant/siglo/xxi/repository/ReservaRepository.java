package com.restaurant.siglo.xxi.repository;


import java.sql.Timestamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Integer>{
	
	@Query(value = "select crear_reserva(:id_reserva, :cantidad_consumidores, :comentario , :fecha_reserva, :hora_reserva, :id_cliente, :id_estado_reserva, :id_mesa) ", nativeQuery = true)
	String crearReserva(@Param("id_reserva") int id_reserva, 
			@Param("cantidad_consumidores") int cantidad_consumidores,
			@Param("comentario") String comentario,
			@Param("fecha_reserva") Timestamp fecha_reserva,
			@Param("hora_reserva") String hora_reserva,
			@Param("id_cliente") int id_cliente,
			@Param("id_estado_reserva") int id_estado_reserva,
			@Param("id_mesa") int id_mesa);	
	
	@Query(value = "select nextval('seq_id_reserva')", nativeQuery = true)
	int nextValIdReserva();	
}