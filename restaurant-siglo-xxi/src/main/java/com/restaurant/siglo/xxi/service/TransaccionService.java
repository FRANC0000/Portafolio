package com.restaurant.siglo.xxi.service;

import java.util.Map;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface TransaccionService {
	
	public String crearTransaccion(Map<String, Object> trans) throws JSONException;
	public String obtenerTransaccionPorIdBoleta(Map<String, Object> trans) throws JSONException;

}
