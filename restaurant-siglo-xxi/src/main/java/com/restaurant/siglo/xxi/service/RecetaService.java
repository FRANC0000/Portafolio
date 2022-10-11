package com.restaurant.siglo.xxi.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface RecetaService {
	public String modificarReceta(Map<String, Object> receta);
}
