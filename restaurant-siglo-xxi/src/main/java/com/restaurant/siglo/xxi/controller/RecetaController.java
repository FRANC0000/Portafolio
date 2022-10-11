package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.RecetaService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/receta")
public class RecetaController {
	@Autowired
	RecetaService recetaService;
	
	@RequestMapping(value="/modificarReceta")
	public String modificarReceta(@RequestBody Map<String, Object> receta) {
		
		String resp = recetaService.modificarReceta(receta);
		
		return resp;	
	}
}
