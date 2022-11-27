package com.restaurant.siglo.xxi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Receta;

public interface RecetaRepository extends JpaRepository<Receta, Integer>{
	@Query(value = "select modificar_receta(:id_receta, :comentario, :complejidad, :tiempo_preparacion, :titulo_receta) ", nativeQuery = true)
	String modificarReceta(
			@Param("id_receta") int id_receta,
			@Param("comentario") String comentario,
			@Param("complejidad") String complejidad,
			@Param("tiempo_preparacion") int tiempo_preparacion,
			@Param("titulo_receta") String titulo_receta);
	
	@Query(value = "select crear_receta(:comentario, :complejidad, :tiempoPreparacion, :id_plato, :titulo_receta) ", nativeQuery = true)
    String crearReceta(@Param("comentario") String comentario,
            @Param("complejidad") String complejidad,
            @Param("tiempoPreparacion") int tiempoPreparacion,
            @Param("id_plato") int id_plato,
            @Param("titulo_receta") String titulo_receta);
	
	@Query(value = "select eliminar_receta(:id_receta) ", nativeQuery = true)
	 String eliminarReceta(@Param("id_receta") int id_receta);
	
	@Query(name = "obtenerRecetasPorIdPlato", nativeQuery = true)
	List<Receta> obtenerRecetasPorIdPlato(@Param("id_plato") int id_plato);
}
