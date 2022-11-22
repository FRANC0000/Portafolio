package com.restaurant.siglo.xxi.controller;

import java.security.NoSuchAlgorithmException;
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
	public String crearUsuario(@RequestBody Map<String, Object> usuario) throws NoSuchAlgorithmException {
		
		String resp = usuarioService.crearUsuario(usuario);
		
		return resp;	
	}
	
	@RequestMapping(value="/iniciarSesion")
	public String iniciarSesion(@RequestBody Map<String, Object> credenciales) throws NoSuchAlgorithmException {
		
		String resp = usuarioService.iniciarSesion(credenciales);
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerUnUsuario")
	public String obtenerUnUsuario(@RequestBody Map<String, Object> usuario) throws JSONException {
		
		String resp = usuarioService.obtenerUnUsuario(usuario);
		
		return resp;	
	}
	
	
	@RequestMapping(value="/obtenerRoles")
	public String obtenerRoles() throws JSONException{
		String listRoles = usuarioService.obtenerRoles();
		return listRoles;
	}
	
	@RequestMapping(value="/modificarUsuario")
    public String modificarUsuario(@RequestBody Map<String, Object> usuario) {

        String resp = usuarioService.modificarUsuario(usuario);

        return resp;
    }
	
	@RequestMapping(value="/eliminarUsuario")
    public String eliminarUsuario(@RequestBody Map<String, Object> usuario) throws JSONException {
        
        String resp = usuarioService.eliminarUsuario(usuario);
        
        return resp; 
    }
}
