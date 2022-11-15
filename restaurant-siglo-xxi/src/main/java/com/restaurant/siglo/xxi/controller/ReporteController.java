package com.restaurant.siglo.xxi.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.ReporteService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/reporte")
public class ReporteController {

	@Autowired
	ReporteService reporteService;
	
	@RequestMapping(value="/obtenerReporteProducto")
	public String obtenerReporteProducto() throws JSONException {
		JSONObject jsonResult = new JSONObject();
		List<String> reporteProducto = reporteService.obtenerReporteProducto();
		
		JSONArray att = new JSONArray(reporteProducto);

		try {
			jsonResult.put("reporte_producto", att);
		} catch (JSONException e) {
			
			e.printStackTrace();
		}
	
		return jsonResult.toString();
    }
	
	@RequestMapping(value="/obtenerReporteStock")
	public List<String> obtenerReporteStock() throws JSONException {
		List<String> reporteStock = reporteService.obtenerReporteStock();
		
		return reporteStock;
    }
	
	@RequestMapping(value="/crearReporte")
	public String crearReporte(@RequestBody Map<String, Object> reporte) throws JSONException {
		
		String resp = "";
		try {
			resp = reporteService.crearReporte(reporte);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
	@RequestMapping(value="/eliminarReporte")
	public String eliminarReporte(@RequestBody Map<String, Object> reporte) throws JSONException, ParseException{
		String resp = reporteService.eliminarReporte(reporte);
		return resp;
	}
	
	@RequestMapping(value="/modificarReporte")
	public String modificarReporte(@RequestBody Map<String, Object> reporte) throws JSONException, ParseException {		
		String resp = reporteService.modificarReporte(reporte);		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerTipoReporte")
    public String obtenerTipoReporte() throws JSONException, ParseException{
        String listTipoReporte = reporteService.obtenerTipoReporte();
        return listTipoReporte;
    }
	
	@RequestMapping(value="/obtenerReportes")
    public String obtenerReportes() throws JSONException, ParseException{
        String listReporte = reporteService.obtenerReportes();
        return listReporte;
    }
}
