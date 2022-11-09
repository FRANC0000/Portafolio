package com.restaurant.siglo.xxi.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface ProductosRecetaService {
	
	public String crearProductosEnUnaReceta(int id_receta, List<Map<String, Object>> productosEnReceta);

}
