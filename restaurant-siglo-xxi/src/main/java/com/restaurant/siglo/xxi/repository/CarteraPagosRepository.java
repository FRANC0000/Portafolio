package com.restaurant.siglo.xxi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.CarteraPagos;


public interface CarteraPagosRepository extends JpaRepository<CarteraPagos, Integer>{
	
	@Query(value = "select crear_cartera_pago(:rut_cliente, :nro_tarjeta, :mes_exp, :anno_exp, :cvv, :email, :nombre_titular, :rut_titular)", nativeQuery = true)
	String crearCarteraPagos(@Param("rut_cliente") int rut_cliente, 
			@Param("nro_tarjeta") String nro_tarjeta,
			@Param("mes_exp") int mes_exp,
			@Param("anno_exp") int anno_exp,
			@Param("cvv") int cvv,
			@Param("email") String email,
			@Param("nombre_titular") String nombre_titular,
			@Param("rut_titular") String rut_titular);
	
	@Query(name = "obtenerCarteraPagoPorIdCliente", nativeQuery = true)
	List<CarteraPagos> obtenerCarteraPagoPorIdCliente(@Param("id_cliente") int id_cliente);

}
