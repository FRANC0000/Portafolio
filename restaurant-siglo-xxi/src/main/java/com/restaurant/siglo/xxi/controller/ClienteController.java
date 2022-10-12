package com.restaurant.siglo.xxi.controller;

import java.text.ParseException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.ClienteService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/cliente")
public class ClienteController {
	
	@Autowired
	ClienteService clienteService;

	@RequestMapping(value="/modificarCliente")
	public String modificarCliente(@RequestBody Map<String, Object> cliente) throws ParseException {
		
		String resp = clienteService.modificarCliente(cliente);
		
		return resp;	
	}
}
