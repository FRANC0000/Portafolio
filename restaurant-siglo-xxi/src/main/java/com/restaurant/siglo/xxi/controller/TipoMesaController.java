package com.restaurant.siglo.xxi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.TipoMesaService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/tipo-mesa")
public class TipoMesaController {
	
	@Autowired
	TipoMesaService tipoMesaService;
	
	@RequestMapping(value="/obtenerTipoMesa")
	public String obtenerTipoMesa(){
		String listEstadoMesa = tipoMesaService.obtenerTipoMesa();
		return listEstadoMesa;
	}		
}
