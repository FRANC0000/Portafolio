package com.restaurant.siglo.xxi.service;

import java.text.ParseException;
import java.util.Map;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface ProductoService {
	String obtenerProductos() throws JSONException;
	public String crearProducto(Map<String, Object> producto) throws ParseException;
	public String eliminarProducto(Map<String, Object> producto) throws ParseException;
	public String modificarProducto(Map<String, Object> producto) throws ParseException;
	public String obtenerUnProducto(Map<String, Object> plato) throws ParseException;
	public String restarStock(Map<String, Object> plato) throws ParseException;
    public String obtenerTipoProducto() throws ParseException, JSONException;
}
