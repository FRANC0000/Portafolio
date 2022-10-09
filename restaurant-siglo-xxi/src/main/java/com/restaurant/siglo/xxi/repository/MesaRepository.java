package com.restaurant.siglo.xxi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Mesa;

public interface MesaRepository extends JpaRepository<Mesa, Integer>{
	
	@Query(value = "select crear_mesa(:id_mesa, :id_tipo_mesa, :id_estado_mesa)", nativeQuery = true)
	String crearMesa(@Param("id_mesa") int id_mesa, 
			@Param("id_tipo_mesa") int id_tipo_mesa,
			@Param("id_estado_mesa") int id_estado_mesa);
	
	@Query(value = "select modificar_mesa(:id_mesa, :id_estado_mesa)", nativeQuery = true)
	String modificarMesa(@Param("id_mesa") int id_mesa, 
			@Param("id_estado_mesa") int id_estado_mesa);

}
