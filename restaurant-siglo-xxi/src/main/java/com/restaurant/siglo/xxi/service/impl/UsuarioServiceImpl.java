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


	@Override
	public String iniciarSesion(Map<String, Object> credenciales) {
		
		String id_usuario = credenciales.get("id_usuario").toString();
		String contrasena = credenciales.get("contrasena").toString();
		String resp = usuarioRepository.iniciarSesion(id_usuario, contrasena);
		
		return resp;
	}


	@Override
	public String obtenerUnUsuario(Map<String, Object> usuario) throws JSONException {
		
		String id_usuario = usuario.get("id_usuario").toString();
		
		Usuario user = usuarioRepository.getById(id_usuario);
		JSONObject resp = new JSONObject();
		
		try {			
			resp.put("id_usuario", user.getId_usuario());
			resp.put("nombre", user.getNombre());
			resp.put("apellido_paterno", user.getApellidoPaterno());
			resp.put("apellido_materno", user.getApellidoMaterno());
			resp.put("rol", user.getRol());
			resp.put("rut", user.getRut());
			resp.put("correo", user.getCorreo());
			
		} catch (Exception e) {
			return "Usuario no existe. \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		return resp.toString();
	}


    @Override
    public String modificarUsuario(Map<String, Object> usuario) {
        
        String resp = "";
        String id_usuario = usuario.get("id_usuario").toString();
        String rol = usuario.get("rol").toString();
        String nombre = usuario.get("nombre").toString();
        String apP  = usuario.get("apellido_paterno").toString();
        String apM  = usuario.get("apellido_materno").toString();
        String rut  = usuario.get("rut").toString();
        String correo = usuario.get("correo").toString();
        String contrasena = usuario.get("contrasena").toString();
        
        resp = usuarioRepository.modificarUsuario(id_usuario, nombre, apP, apM, rut, rol, correo, contrasena);
        
        return resp;
    }
	

}
