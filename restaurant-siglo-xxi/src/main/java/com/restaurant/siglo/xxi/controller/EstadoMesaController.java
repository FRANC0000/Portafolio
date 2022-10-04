package com.restaurant.siglo.xxi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.EstadoMesaService;
import com.restaurant.siglo.xxi.service.UsuarioService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/estado-mesa")
public class EstadoMesaController {
	
	@Autowired
	EstadoMesaService estadoService;
	
	@RequestMapping(value="/obtenerEstadoMesa")
	public String obtenerEstadoMesa(){
		String listEstadoMesa = estadoService.obtenerEstadoMesa();
		return listEstadoMesa;
	}
}
