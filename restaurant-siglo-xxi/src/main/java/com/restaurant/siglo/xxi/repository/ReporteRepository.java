package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Reporte;

public interface ReporteRepository extends JpaRepository<Reporte, Integer>{
	
	@Query(value = "SELECT * FROM  vista_reporte_pedido", nativeQuery = true)
	List<String> obtenerReporteProducto();
	
	@Query(value = "SELECT * FROM  vista_reporte_stock2", nativeQuery = true)
	List<String> obtenerReporteStock();
	
	@Query(value = "select crear_reporte(:comentario, :extension, :fecha_creacion, :nombre_creacion, :titulo_reporte, :id_tipo_reporte, :id_usuario) ", nativeQuery = true)
	String crearReporte
			(@Param("comentario") String comentario,
			@Param("extension") String extension,
			@Param("fecha_creacion") Timestamp fecha_creacion,
			@Param("nombre_creacion") String nombre_creacion,
			@Param("titulo_reporte") String titulo_reporte,
			@Param("id_tipo_reporte") int id_tipo_reporte,
			@Param("id_usuario") String id_usuario);
	
	@Query(value = "select eliminar_reporte(:id_reporte)", nativeQuery = true)
    String eliminarReporte(@Param("id_reporte") int id_reporte);
	
	@Query(value = "select modificar_reporte(:id_reporte, :comentario, :extension, :fecha_creacion, :nombre_creacion, :titulo_reporte, :id_tipo_reporte, :id_usuario)", nativeQuery = true)
	String modificarReporte
			(@Param("id_reporte") int id_reporte,
			@Param("comentario") String comentario,
			@Param("extension") String extension,
			@Param("fecha_creacion") Timestamp fecha_creacion,
			@Param("nombre_creacion") String nombre_creacion,
			@Param("titulo_reporte") String titulo_reporte,
			@Param("id_tipo_reporte") int id_tipo_reporte,
			@Param("id_usuario") String id_usuario);
	
}
