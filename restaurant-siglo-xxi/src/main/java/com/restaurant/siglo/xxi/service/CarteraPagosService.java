package com.restaurant.siglo.xxi.service;

import java.security.NoSuchAlgorithmException;
import java.util.Map;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface CarteraPagosService {
	
	public String crearCarteraPagos(Map<String, Object> card) throws JSONException, NoSuchAlgorithmException;
	public String obtenerCarteraPagosPorIdCliente( Map<String, Object> card) throws JSONException;

}
