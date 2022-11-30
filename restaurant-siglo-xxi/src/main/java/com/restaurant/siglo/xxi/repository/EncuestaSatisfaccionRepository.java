package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.EncuestaSatisfaccion;

public interface EncuestaSatisfaccionRepository extends JpaRepository<EncuestaSatisfaccion, Integer>{
	@Query(value = "select crear_encuestaSatisfaccion(:puntuacion_comida, :puntuacion_tiempo_atencion, :puntuacion_trato_del_personal, :puntuacion_interaccion_sistema, :recomendado, :vuelta, :comentario, :fecha_encuesta, :id_reserva)", nativeQuery = true)
	String crearEncuestaSatisfaccion(@Param("puntuacion_comida") int puntuacion_comida,
			@Param("puntuacion_tiempo_atencion") int puntuacion_tiempo_atencion,
			@Param("puntuacion_trato_del_personal") int puntuacion_trato_del_personal,
			@Param("puntuacion_interaccion_sistema") int puntutacion_interaccion_sistema,
			@Param("recomendado") boolean recomendado,
			@Param("vuelta") boolean vuelta,
			@Param("comentario") String comentario,
			@Param("fecha_encuesta") Timestamp fecha_encuesta,
			@Param("id_reserva") int  id_reserva);
}
