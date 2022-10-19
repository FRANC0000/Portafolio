package com.restaurant.siglo.xxi.controller;

import java.text.ParseException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.BoletaService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/boleta")
public class BoletaController {
	
	@Autowired
	BoletaService boletaService;
	
	@RequestMapping(value="/instanciarBoleta")
	public String instanciarBoleta(@RequestBody Map<String, Object> boletaAIngresar) {
		
		String resp = "";
		try {
			resp = boletaService.instanciarBoleta(boletaAIngresar);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerBoletaEnProcesoPorIdCliente")
	public String obtenerBoletaEnProcesoPorIdCliente(@RequestBody Map<String, Object> idCliente) {
		
		String resp = "";
		try {
			resp = boletaService.obtenerBoletaEnProcesoPorIdCliente(idCliente);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
	@RequestMapping(value="/boletaAModificar")
	public String boletaAModificar(@RequestBody Map<String, Object> boletaAModificar) {
		
		String resp = "";
		try {
			resp = boletaService.boletaAModificar(boletaAModificar);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}

}
