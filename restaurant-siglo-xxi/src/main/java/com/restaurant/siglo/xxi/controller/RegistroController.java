package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.RegistroService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/registro")
public class RegistroController {
	@Autowired
	RegistroService registroService;
	
	@RequestMapping(value="/crearRegistro")
	public String crearRegistro(@RequestBody Map<String, Object> registro) {
		
		String resp = registroService.crearRegistro(registro);
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerRegistros")
	public String obtenerRegistros() throws JSONException {
		
		String resp = registroService.obtenerRegistros();
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerSolicitudReabastecimiento")
	public String obtenerSolcitiudReabastecimiento() throws JSONException {
		
		String resp = registroService.obtenerSolicitudReabastecimiento();
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerSolicitudReabastecimientoFinanzas")
	public String obtenerSolicitudReabastecimientoFinanzas() throws JSONException {
		
		String resp = registroService.obtenerSolicitudReabastecimientoFinanzas();
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerSolicitudReabastecimientoRechazada")
	public String obtenerSolicitudReabastecimientoRechazada() throws JSONException {
		
		String resp = registroService.obtenerSolicitudReabastecimientoRechazada();
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerSolicitudReabastecimientoAprobada")
	public String obtenerSolicitudReabastecimientoAprobada() throws JSONException {
		
		String resp = registroService.obtenerSolicitudReabastecimientoAprobada();
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerSolicitudReabastecimientoModificada")
	public String obtenerSolicitudReabastecimientoModificada() throws JSONException {
		
		String resp = registroService.obtenerSolicitudReabastecimientoModificada();
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerSolicitudReabastecimientoProveedores")
	public String obtenerSolicitudReabastecimientoProveedores() throws JSONException {
		
		String resp = registroService.obtenerSolicitudReabastecimientoProveedores();
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerSolicitudIngredientes")
	public String obtenerSolicitudIngredientes() throws JSONException {
		
		String resp = registroService.obtenerSolicitudIngredientes();
		
		return resp;	
	}
	
	@RequestMapping(value="/actualizarUltimaVersionRegistro")
	public String actualizarUltimaVersionRegistro(@RequestBody Map<String, Object> registro) throws JSONException {
		
		String resp = registroService.actualizarUltimaVersionRegistro(registro);
		
		return resp;	
	}
}
