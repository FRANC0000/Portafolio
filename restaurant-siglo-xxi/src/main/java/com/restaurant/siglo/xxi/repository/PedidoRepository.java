package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer>{
	@Query(value = "select crear_pedido(:id_pedido, :fecha_ingreso, :id_cliente, :id_estado_instancia, :id_mesa, :subtotal, :id_boleta )", nativeQuery = true)
	String crearPedido(@Param("id_pedido") int id_pedido, 
			@Param("fecha_ingreso") Timestamp fecha_ingreso,
			@Param("id_cliente") int id_cliente,
			@Param("id_estado_instancia") int id_estado_instancia,
			@Param("id_mesa") int id_mesa,
			@Param("subtotal") int subtotal,
			@Param("id_boleta") int id_boleta);
	
	@Query(value = "select nextval('seq_id_pedido')", nativeQuery = true)
	int nextValIdPedido();
	
	@Query(name = "obtenerPedidosPorIdBoleta", nativeQuery = true)
	List<Pedido> obtenerPedidosPorIdBoleta(@Param("id_boleta") int id_boleta);
}
