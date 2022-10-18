package com.restaurant.siglo.xxi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.PlatosPedido;
import com.restaurant.siglo.xxi.clases.ProductosPedido;

public interface ProductosPedidoRepository extends JpaRepository<ProductosPedido, Long>{
	
	@Query(value = "select crear_productos_pedido(:id_pedido, :id_producto, :cantidad_producto)", nativeQuery = true)
	String crearProductosPedido(@Param("id_pedido") int id_pedido,
			@Param("id_producto") int id_producto,
			@Param("cantidad_producto") int cantidad_producto);
	
	@Query(name = "obtenerProductosPorIdPedido", nativeQuery = true)
	List<ProductosPedido> obtenerProductosPorIdPedido(@Param("id_pedido") int id_pedido);

}
