package com.restaurant.siglo.xxi.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.json.JSONException;
import org.springframework.stereotype.Service;

@Service
public interface ReporteService {
	
	public List<String> obtenerReporteProducto()throws JSONException;
	
	public List<String> obtenerReporteStock()throws JSONException;

	public String crearReporte(Map<String, Object> reporte) throws ParseException, JSONException;

	public String eliminarReporte(Map<String, Object> reporte) throws ParseException, JSONException;

	public String modificarReporte(Map<String, Object> reporte) throws ParseException, JSONException;

	public String obtenerTipoReporte() throws JSONException;
	
	public String obtenerReportes() throws JSONException;

}
