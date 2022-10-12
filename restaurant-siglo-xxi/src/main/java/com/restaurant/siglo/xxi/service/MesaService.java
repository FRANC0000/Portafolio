package com.restaurant.siglo.xxi.service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Mesa;

@Service
public interface MesaService {
	
	public String obtenerMesas();
	public String crearMesa(Mesa mesa);
	public String obtenerUnaMesa(Map<String, Object> idMesa);
}
