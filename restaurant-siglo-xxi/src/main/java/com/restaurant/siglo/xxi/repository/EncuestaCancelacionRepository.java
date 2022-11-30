package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.EncuestaCancelacion;

public interface EncuestaCancelacionRepository extends JpaRepository<EncuestaCancelacion, Integer>{
	@Query(value = "select crear_encuestaCancelacion(:motivo, :puntuacion_atencion, :comentario, :fecha_encuesta, :id_reserva)", nativeQuery = true)
	String crearEncuestaCancelacion(@Param("motivo") String motivo,
			@Param("puntuacion_atencion") int puntuacion_atencion,
			@Param("comentario") String comentario,
			@Param("fecha_encuesta") Timestamp fecha_encuesta,
			@Param("id_reserva") int  id_reserva);
}
