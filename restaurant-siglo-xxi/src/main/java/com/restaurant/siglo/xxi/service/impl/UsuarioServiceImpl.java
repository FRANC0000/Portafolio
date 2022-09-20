package com.restaurant.siglo.xxi.service.impl;

import java.util.List;
import java.util.Map;

import javax.persistence.Id;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Usuario;
import com.restaurant.siglo.xxi.repository.UsuarioRepository;
import com.restaurant.siglo.xxi.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService{
	
	@Autowired
	UsuarioRepository usuarioRepository;

	@Override
	public String obtenerUsuarios() throws JSONException {
		
		List<Usuario> listado = usuarioRepository.findAll();
		JSONObject resp = new JSONObject();
		JSONArray listUsuarios = new JSONArray();
		
		/*
	 	ATRIBUTOS USUARIO
	 	@Id
		String id_usuario;
		String rol;
		String nombre;
		String apellidoPaterno;
		String apellidoMaterno;
		String rut;
		String correo;
		String contrasena;
		*/
		
		listado.forEach((user) -> {
			try {
				JSONObject usuario = new JSONObject();
				usuario.put("id_usuario", user.getId_usuario());
				usuario.put("rol", user.getRol());
				usuario.put("nombre", user.getNombre());
				usuario.put("apellido_paterno", user.getApellidoPaterno());
				usuario.put("apellido_materno", user.getApellidoMaterno());
				usuario.put("rut", user.getRut());
				usuario.put("correo", user.getCorreo());
				usuario.put("contrasena", user.getContrasena());
				listUsuarios.put(usuario);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
		
		resp.put("usuarios", listUsuarios);
		return  resp.toString();
	}

	
	@Override
	public String crearUsuario(Map<String, Object> usuario) {
		
		String id_usuario = usuario.get("id_usuario").toString();
		String rol = usuario.get("rol").toString();
		String nombre = usuario.get("nombre").toString();
		String apP  = usuario.get("apellido_paterno").toString();
		String apM  = usuario.get("apellido_materno").toString();
		String rut  = usuario.get("rut").toString();
		String correo = usuario.get("correo").toString();
		String contrasena = usuario.get("contrasena").toString();
		
		String resp = usuarioRepository.crearUsuario(id_usuario, nombre, apP, apM, rut, rol, correo, contrasena); 
	
		
		return resp;
	}
	

}
