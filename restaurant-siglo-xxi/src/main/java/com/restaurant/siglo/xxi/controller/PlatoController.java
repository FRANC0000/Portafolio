package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.PlatoService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/plato")
public class PlatoController {

	@Autowired
    PlatoService  platoService;
    
    @RequestMapping(value="/obtenerPlatos")
    public String obtenerPlatos() throws JSONException{
        String listPlatos = platoService.obtenerPlatos();
        return listPlatos;
    }
    
    @RequestMapping(value="/crearPlato")
	public String crearPlato(@RequestBody Map<String, Object> plato) {
		
		String resp = platoService.crearPlato(plato);
		
		return resp;	
	}
	
	@RequestMapping(value="/eliminarPlato")
	public String eliminarPlato(@RequestBody Map<String, Object> plato) throws JSONException{
		String resp = platoService.eliminarPlato(plato);
		return resp;
	}
	
	@RequestMapping(value="/obtenerUnPlato")
	public String obtenerUnPlato(@RequestBody Map<String, Object> plato) throws JSONException {
		
		String resp = platoService.obtenerUnPlato(plato);
		
		return resp;	
	}
	
	@RequestMapping(value="/modificarPlato")
	public String modificarPlato(@RequestBody Map<String, Object> plato) {
		
		String resp = platoService.modificarPlato(plato);
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerTipoPlato")
    public String obtenerTipoPlato() throws JSONException{
        String listTipoPlato = platoService.obtenerTipoPlato();
        return listTipoPlato;
	}
}
