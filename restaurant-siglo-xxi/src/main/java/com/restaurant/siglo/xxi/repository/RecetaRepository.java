package com.restaurant.siglo.xxi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Receta;

public interface RecetaRepository extends JpaRepository<Receta, Integer>{
	@Query(value = "select modificar_receta(:id_receta, :comentario, :complejidad, :tiempo_preparacion, :eliminado) ", nativeQuery = true)
	String modificarReceta(
			@Param("id_receta") int id_receta,
			@Param("comentario") String comentario,
			@Param("complejidad") String complejidad,
			@Param("tiempo_preparacion") int tiempo,
			@Param("eliminado") boolean eliminado);
	
	@Query(value = "select crear_receta(:id_receta, :comentario, :complejidad, :tiempoPreparacion) ", nativeQuery = true)
    String crearReceta(@Param("id_receta") int id_receta,
            @Param("comentario") String comentario,
            @Param("complejidad") String complejidad,
            @Param("tiempoPreparacion") int tiempoPreparacion);
	
	@Query(value = "select eliminar_receta(:id_receta) ", nativeQuery = true)
	 String eliminarReceta(@Param("id_receta") int id_receta);
}
