package com.restaurant.siglo.xxi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.repository.ProductosRecetaRepository;
import com.restaurant.siglo.xxi.service.ProductosRecetaService;

@Service
public class ProductosRecetaServiceImpl implements ProductosRecetaService{
	
	@Autowired
	ProductosRecetaRepository productosRecetaRepository;

	@Override
	public String crearProductosEnUnaReceta(int id_receta, List<Map<String, Object>> productosEnReceta) {
		
		for (Map<String, Object> unProductoEnReceta : productosEnReceta) {
			int id_producto = Integer.parseInt(unProductoEnReceta.get("id_producto").toString());
			int cantidad = Integer.parseInt(unProductoEnReceta.get("cantidad").toString());
			String comentario = unProductoEnReceta.get("comentario").toString();
			
			productosRecetaRepository.crearProductosReceta(id_producto, id_receta, cantidad, comentario);
		}
		
		
		return ""+id_receta;
	}

}
