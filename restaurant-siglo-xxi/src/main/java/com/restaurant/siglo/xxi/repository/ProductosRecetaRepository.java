package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.ProductosReceta;

public interface ProductosRecetaRepository extends JpaRepository<ProductosReceta, Long> {
	
	@Query(value = "select crear_productos_receta(:id_producto, :id_receta, :cantidad_producto , :cometario) ", nativeQuery = true)
	String crearProductosReceta(@Param("id_producto") int id_producto, 
			@Param("id_receta") int id_receta,
			@Param("cantidad_producto") int cantidad_producto,
			@Param("cometario") String cometario);	
	
	@Query(name = "obtenerProductosDeUnaReceta", nativeQuery = true)
	List<ProductosReceta> obtenerProductosDeUnaReceta(@Param("id_receta") int id_receta);	

}
