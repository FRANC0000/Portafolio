package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Registro;

public interface RegistroRepository extends JpaRepository<Registro, Integer>{
	
	@Query(value = "select crear_registro(:descripcion, :fecha_instancia, :hora_instancia, :titulo_registro,"
			+ " :id_estado_registro, :id_modulo, :id_tipo_registro, :id_usuario, :id_registro_padre, :version)", nativeQuery = true)
	String crearRegistro(@Param("descripcion") String descripcion, 
			@Param("fecha_instancia") Timestamp fecha_instancia,
			@Param("hora_instancia") String hora_instancia,
			@Param("titulo_registro") String titulo_registro,
			@Param("id_estado_registro") int id_estado_registro,
			@Param("id_modulo") int id_modulo,
			@Param("id_tipo_registro") int id_tipo_registro,
			@Param("id_usuario") String id_usuario,
			@Param("id_registro_padre") int id_registro_padre,
			@Param("version") int version);
	
	@Query(name = "obtenerSolicitudReabastecimiento", nativeQuery = true)
	List<Registro> obtenerSolicitudReabastecimiento();
	
	@Query(name = "obtenerSolicitudReabastecimientoFinanzas", nativeQuery = true)
	List<Registro> obtenerSolicitudReabastecimientoFinanzas();

}
