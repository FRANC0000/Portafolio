package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.EncuestaSatisfaccionService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/encuesta-satisfaccion")
public class EncuestaSatisfaccionController {
	@Autowired
	EncuestaSatisfaccionService encuestaSatisfaccionService;
	
	@RequestMapping(value="/crearEncuestaSatisfaccion")
	public String crearEncuestaSatisfaccion(@RequestBody Map<String, Object> encuestaSatisfaccion) {
		String resp = encuestaSatisfaccionService.crearEncuestaSatisfaccion(encuestaSatisfaccion);
		
		return resp;
	}
	
}