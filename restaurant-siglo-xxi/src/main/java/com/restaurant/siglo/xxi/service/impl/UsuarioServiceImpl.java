package com.restaurant.siglo.xxi.service.impl;

import java.util.List;
import java.util.Map;

import javax.persistence.Id;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Rol;
import com.restaurant.siglo.xxi.clases.Usuario;
import com.restaurant.siglo.xxi.repository.RolRepository;
import com.restaurant.siglo.xxi.repository.UsuarioRepository;
import com.restaurant.siglo.xxi.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService{
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	RolRepository rolRepository;

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
				usuario.put("rol", user.getRol().getId_rol());
				usuario.put("nombre", user.getNombre());
				usuario.put("apellido_paterno", user.getApellidoPaterno());
				usuario.put("apellido_materno", user.getApellidoMaterno());
				usuario.put("rut", user.getRut());
				usuario.put("dv", user.getDv());
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
		int rol = Integer.parseInt(usuario.get("rol").toString());
		String nombre = usuario.get("nombre").toString();
		String apP  = usuario.get("apellido_paterno").toString();
		String apM  = usuario.get("apellido_materno").toString();
		int rut  = Integer.parseInt(usuario.get("rut").toString());
		String dv = usuario.get("dv").toString();
		String correo = usuario.get("correo").toString();
		String contrasena = usuario.get("contrasena").toString();

		String resp = usuarioRepository.crearUsuario(id_usuario, nombre, apP, apM, rut, dv, rol, correo, contrasena); 
		
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
			resp.put("rol", user.getRol().getId_rol());
			resp.put("nombre_id_rol", user.getRol().getNombre_rol());
			resp.put("rut", user.getRut());
			resp.put("dv", user.getDv());
			resp.put("correo", user.getCorreo());
			
		} catch (Exception e) {
			return "Usuario no existe. \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		return resp.toString();
	}


	@Override
	public String obtenerRoles() throws JSONException {
		
		List<Rol> roles = rolRepository.findAll();
		JSONObject resp = new JSONObject();
		JSONArray listRoles = new JSONArray();
		
		for (Rol rol : roles) {
			try {
				JSONObject unRol = new JSONObject();
				unRol.put("id_rol", rol.getId_rol());
				unRol.put("nombre_rol", rol.getNombre_rol());
				listRoles.put(unRol);
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		resp.put("list_roles", listRoles);
		
		return resp.toString();
	}
	

}
