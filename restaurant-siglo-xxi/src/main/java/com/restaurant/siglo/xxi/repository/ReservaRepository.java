package com.restaurant.siglo.xxi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.siglo.xxi.clases.Reserva;

public interface ReservaRepository extends JpaRepository<Reserva, Integer>{
	
}
