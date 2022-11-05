package com.restaurant.siglo.xxi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Plato;

public interface PlatoRepository extends JpaRepository<Plato, Integer>{

	@Query(value = "select crear_plato(:cantidad_personas_recomendadas, :comentario, :descripcion_plato, :disponibilidad, :nombre_plato, :precio_plato, :id_tipo_plato) ", nativeQuery = true)
	String crearPlato(@Param("cantidad_personas_recomendadas") int cantidad_personas_recomendadas,
			@Param("comentario") String comentario,
			@Param("descripcion_plato") String descripcion_plato,
			@Param("disponibilidad") boolean disponibilidad,
			@Param("nombre_plato") String nombre_plato,
			@Param("precio_plato") int precio_plato,
			@Param("id_tipo_plato") int id_tipo_plato);

	@Query(value = "select eliminar_plato(:id_plato)", nativeQuery = true)
		String eliminarPlato(@Param("id_plato") int id_plato);
	
	@Query(value = "select modificar_plato(:id_plato, :cantidad_personas_recomendadas, :comentario, :descripcion_plato, :disponibilidad, :nombre_plato, :precio_plato, :id_tipo_plato, :eliminado) ", nativeQuery = true)
	String modificarPlato(
			@Param("id_plato") int id_plato,
			@Param("cantidad_personas_recomendadas") int cantidad_personas_recomendadas,
			@Param("comentario") String comentario,
			@Param("descripcion_plato") String descripcion_plato,
			@Param("disponibilidad") boolean disponibilidad,
			@Param("nombre_plato") String nombre_plato,
			@Param("precio_plato") int precio_plato,
			@Param("id_tipo_plato") int id_tipo_plato,
			@Param("eliminado") boolean eliminado);
	
	@Query(value = "select agregar_nombre_imagen_plato(:id_plato, :nombre_archivo) ", nativeQuery = true)
	String agregarNombreImagenPorIdPlato(
			@Param("id_plato") int id_plato,
			@Param("nombre_archivo") String nombre_archivo);
}
