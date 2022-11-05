package com.restaurant.siglo.xxi.controller;

import java.text.ParseException;
import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.clases.Mesa;
import com.restaurant.siglo.xxi.service.MesaService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/mesa")
public class MesaController {
	
	@Autowired
	MesaService mesaService;

	@RequestMapping(value="/obtenerMesas")
	public String obtenerMesas() throws JSONException{
		String listMesas = mesaService.obtenerMesas();
		return listMesas;
	}
	
	@RequestMapping(value="/crearMesa")
	public String crearMesa(@RequestBody Map<String, Object> mesa) throws JSONException{
		String resp = mesaService.crearMesa(mesa);
		return resp;
	}
	
	@RequestMapping(value="/obtenerUnaMesa")
	public String obtenerUnaMesa(@RequestBody Map<String, Object> idMesa) throws JSONException{
		String resp = mesaService.obtenerUnaMesa(idMesa);
		return resp;
	}
	
	@RequestMapping(value="/modificarMesa")
	public String modificarMesa(@RequestBody Map<String, Object> mesa) throws JSONException{
		String resp = mesaService.modificarMesa(mesa);
		return resp;
	}
	
	@RequestMapping(value="/eliminarMesa")
	public String eliminarMesa(@RequestBody Map<String, Object> mesa) throws JSONException, ParseException{
		String resp = mesaService.eliminarMesa(mesa);
		return resp;
	}
}
