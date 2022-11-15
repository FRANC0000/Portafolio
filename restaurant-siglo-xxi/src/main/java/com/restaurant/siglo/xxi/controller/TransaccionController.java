package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.TransaccionService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/transaccion")
public class TransaccionController {
	
	@Autowired
	TransaccionService transaccionService;
	
	@RequestMapping(value="/crearTransaccion")
	public String crearUsuario(@RequestBody Map<String, Object> trans) throws JSONException {
		
		String resp = transaccionService.crearTransaccion(trans);
		
		return resp;	
	}

}
