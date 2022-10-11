package com.restaurant.siglo.xxi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Receta;

public interface RecetaRepository extends JpaRepository<Receta, Integer>{
	@Query(value = "select modificar_receta(:id_receta, :comentario, :tiempo_preparacion, :complejidad) ", nativeQuery = true)
	String modificarReceta(
			@Param("id_receta") int id_receta,
			@Param("comentario") String comentario,
			@Param("tiempo_preparacion") int tiempo,
			@Param("complejidad") String complejidad);
}
