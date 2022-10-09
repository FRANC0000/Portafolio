package com.restaurant.siglo.xxi.service;

import java.util.Map;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface UsuarioService {
	
	public String obtenerUsuarios() throws JSONException;
	public String crearUsuario(Map<String, Object> usuario);
	public String iniciarSesion(Map<String, Object> credenciales);
	public String obtenerUnUsuario(Map<String, Object> usuario) throws JSONException;
	public String obtenerRoles() throws JSONException;
	
}
