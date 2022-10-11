package com.restaurant.siglo.xxi.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.repository.RecetaRepository;
import com.restaurant.siglo.xxi.service.RecetaService;

@Service
public class RecetaServiceImpl implements RecetaService{
	@Autowired
	RecetaRepository recetaRepository;

	@Override
	public String modificarReceta(Map<String, Object> receta) {		

		int id_receta = Integer.parseInt(receta.get("id_receta").toString());
		String comentario = receta.get("comentario").toString();
		int tiempo_preparacion = Integer.parseInt(receta.get("tiempo_preparacion").toString());
		String complejidad = receta.get("complejidad").toString();
		
		
		String resp = recetaRepository.modificarReceta(id_receta, comentario, tiempo_preparacion, complejidad); 
	
		
		return resp;
	}

}
