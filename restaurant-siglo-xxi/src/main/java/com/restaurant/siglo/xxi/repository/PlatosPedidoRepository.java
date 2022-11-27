package com.restaurant.siglo.xxi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.PlatosPedido;

public interface PlatosPedidoRepository extends JpaRepository<PlatosPedido,Long>{
	
	@Query(value = "select crear_platos_pedido(:id_pedido, :id_plato, :cantidad_platos, :recetaSeleccionada)", nativeQuery = true)
	String crearPlatosPedido(@Param("id_pedido") int id_pedido,
			@Param("id_plato") int id_plato,
			@Param("cantidad_platos") int cantidad_platos,
			@Param("recetaSeleccionada") String recetaSeleccionada);

	@Query(name = "obtenerPlatosPedidoPorIdCompuesto", nativeQuery = true)
	List<PlatosPedido> obtenerPlatosPedidoPorIdCompuesto(@Param("id_pedido") int id_pedido,
			@Param("id_plato") int id_plato);
	
	@Query(name = "obtenerPlatosPorIdPedido", nativeQuery = true)
	List<PlatosPedido> obtenerPlatosPorIdPedido(@Param("id_pedido") int id_pedido);

}
