package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.json.JSONException;
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
	
	@RequestMapping(value="/crearReceta")
    public String crearReceta(@RequestBody Map<String, Object> receta) {
        
        String resp = recetaService.crearReceta(receta);
        
        return resp;    
    }
	
	@RequestMapping(value="/obtenerUnaReceta")
    public String obtenerUnaReceta(@RequestBody Map<String, Object> receta) throws JSONException {
        
        String resp = recetaService.obtenerUnaReceta(receta);
        
        return resp;    
    }
	
	@RequestMapping(value="/eliminarReceta")
    public String eliminarReceta(@RequestBody Map<String, Object> receta) throws JSONException {
        
        String resp = recetaService.eliminarReceta(receta);
        
        return resp; 
    }
    
    @RequestMapping(value="/obtenerRecetas")
    public String obtenerRecetas() throws JSONException{
        String listRecetas = recetaService.obtenerRecetas();
        return listRecetas;
    }
}
