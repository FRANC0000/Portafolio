package com.restaurant.siglo.xxi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restaurant.siglo.xxi.clases.Reporte;
import com.restaurant.siglo.xxi.clases.TipoReporte;

public interface TipoReporteRepository extends JpaRepository<TipoReporte, Integer>{

}
