package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.EncuestaCancelacionService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/encuesta-cancelacion")
public class EncuestaCancelacionController {
	@Autowired
	EncuestaCancelacionService encuestaCancelacionService;
	
	@RequestMapping(value="/crearEncuestaCancelacion")
	public String crearEncuestaCancelacion(@RequestBody Map<String, Object> encuestaCancelacion) {
		String resp = encuestaCancelacionService.crearEncuestaCancelacion(encuestaCancelacion);
		
		return resp;
	}
	
}
