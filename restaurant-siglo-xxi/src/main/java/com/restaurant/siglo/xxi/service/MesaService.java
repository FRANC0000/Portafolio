package com.restaurant.siglo.xxi.service;

import java.text.ParseException;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Mesa;

@Service
public interface MesaService {
	
	public String obtenerMesas();
	public String crearMesa(Map<String, Object> mesa);
	public String obtenerUnaMesa(Map<String, Object> idMesa);
	public String modificarMesa(Map<String, Object> mesa);
	public String eliminarMesa(Map<String, Object> mesa) throws ParseException;
}
