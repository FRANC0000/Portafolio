package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.CarteraPagosService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/cartera")
public class CarteraPagosController {
	
	@Autowired
	CarteraPagosService carteraPagosService;
	
	@RequestMapping(value="/crearCarteraPagos")
	public String crearCarteraPagos(@RequestBody Map<String, Object> card) throws JSONException {
		
		String resp = carteraPagosService.crearCarteraPagos(card);
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerCarteraPagosPorIdCliente")
	public String obtenerCarteraPagosPorIdCliente(@RequestBody Map<String, Object> card) throws JSONException {
		
		String resp = carteraPagosService.obtenerCarteraPagosPorIdCliente(card);
		
		return resp;	
	}

}
