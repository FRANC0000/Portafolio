package com.restaurant.siglo.xxi.controller;

import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.restaurant.siglo.xxi.service.UsuarioService;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RestController
@RequestMapping("/rest-rsxii/usuario")
public class UsuarioController {
	
	@Autowired
	UsuarioService usuarioService;
	
	@RequestMapping(value="/obtenerUsuarios")
	public String obtenerUsuarios() throws JSONException{
		String listUsuarios = usuarioService.obtenerUsuarios();
		return listUsuarios;
	}
	
	@RequestMapping(value="/crearUsuario")
	public String crearUsuario(@RequestBody Map<String, Object> usuario) {
		
		String resp = usuarioService.crearUsuario(usuario);
		
		return resp;	
	}
	
}
