package com.restaurant.siglo.xxi.service;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface UsuarioService {
	
	public String obtenerUsuarios() throws JSONException;
	public String crearUsuario(Map<String, Object> usuario) throws NoSuchAlgorithmException;
	public String iniciarSesion(Map<String, Object> credenciales) throws NoSuchAlgorithmException;
	public String obtenerUnUsuario(Map<String, Object> usuario) throws JSONException;
	public String obtenerRoles() throws JSONException;
	public String modificarUsuario(Map<String, Object> usuario);
	public String eliminarUsuario(Map<String, Object> usuario);
}
