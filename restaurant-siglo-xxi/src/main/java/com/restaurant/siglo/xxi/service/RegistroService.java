package com.restaurant.siglo.xxi.service;

import java.util.Map;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface RegistroService {
	
	public String crearRegistro(Map<String, Object> registro);
	
	public String actualizarUltimaVersionRegistro(Map<String, Object> registro);
	
	public String obtenerRegistros() throws JSONException;
	
	public String obtenerSolicitudReabastecimiento() throws JSONException;
	
	public String obtenerSolicitudReabastecimientoFinanzas() throws JSONException;
	
	public String obtenerSolicitudReabastecimientoRechazada() throws JSONException;

	public String obtenerSolicitudReabastecimientoAprobada() throws JSONException;
	
	public String obtenerSolicitudReabastecimientoModificada() throws JSONException;
	
	
	public String obtenerSolicitudReabastecimientoProveedores() throws JSONException;

}
