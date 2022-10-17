package com.restaurant.siglo.xxi.service;

import java.util.Map;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface PlatoService {
	
	public String obtenerPlatos() throws JSONException;
	String crearPlato(Map<String, Object> plato);
	public String obtenerUnPlato(Map<String, Object> plato);
	public String eliminarPlato(Map<String, Object> plato);
	public String modificarPlato(Map<String, Object> plato);
	public String obtenerTipoPlato() throws JSONException;

}
