package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Integer>{

	@Query(value = "select crear_producto(:comentario, :fecha_ingreso_producto, :fecha_vencimiento, :medida_producto, :nombre_producto, :stock_producto, :valor_unitario, :tipo_producto, :stock_ideal) ", nativeQuery = true)
	String crearProducto(@Param("comentario") String comentario,
			@Param("fecha_ingreso_producto") Timestamp fecha_ingreso_producto,
			@Param("fecha_vencimiento") Timestamp fecha_vencimiento,
			@Param("medida_producto") String medida_producto,
			@Param("nombre_producto") String nombre_producto,
			@Param("stock_producto") int stock_producto,
			@Param("valor_unitario") int valor_unitario,
			@Param("tipo_producto") int tipo_producto,
			@Param("stock_ideal") int stock_ideal);
	
	@Query(value = "select eliminar_producto(:id_producto)", nativeQuery = true)
    String eliminarProducto(@Param("id_producto") int id_producto);

	@Query(value = "select modificar_producto(:id_producto, :comentario, :fecha_ingreso_producto, :fecha_vencimiento, :medida_producto, :nombre_producto, :stock_producto, :valor_unitario, :tipo_producto, :stock_ideal)", nativeQuery = true)
	String modificarProducto(@Param("id_producto") int id_producto,
			@Param("comentario") String comentario,
			@Param("fecha_ingreso_producto") Timestamp fecha_ingreso_producto,
			@Param("fecha_vencimiento") Timestamp fecha_vencimiento,
			@Param("medida_producto") String medida_producto,
			@Param("nombre_producto") String nombre_producto,
			@Param("stock_producto") int stock_producto,
			@Param("valor_unitario") int valor_unitario,
			@Param("tipo_producto") int tipo_producto,
			@Param("stock_ideal") int stock_ideal);
	
	@Query(value = "select agregar_nombre_imagen_producto(:id_producto, :nombre_archivo) ", nativeQuery = true)
	String agregarNombreImagenPorIdProducto(
			@Param("id_producto") int id_producto,
			@Param("nombre_archivo") String nombre_archivo);

}
