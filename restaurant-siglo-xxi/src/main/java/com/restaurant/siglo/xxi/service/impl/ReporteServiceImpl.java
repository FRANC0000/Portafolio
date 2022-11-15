package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Reporte;
import com.restaurant.siglo.xxi.clases.TipoReporte;
import com.restaurant.siglo.xxi.repository.ReporteRepository;
import com.restaurant.siglo.xxi.repository.TipoReporteRepository;
import com.restaurant.siglo.xxi.service.ReporteService;

@Service
public class ReporteServiceImpl implements ReporteService {
	
	@Autowired
	ReporteRepository reporteRepository;
	
	@Autowired
    TipoReporteRepository tipoReporteRepository;
	
	@Override
	public List<String> obtenerReporteProducto() {
		List<String> json = reporteRepository.obtenerReporteProducto();
		return json;
	}
	
	@Override
	public List<String> obtenerReporteStock() {
		List<String> json = reporteRepository.obtenerReporteStock();
		return json;
	}
	
	@Override
	public String crearReporte(Map<String, Object> reporte) throws ParseException {
		
		String comentario = reporte.get("comentario").toString();
		String extension  = reporte.get("extension").toString();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String fecha_creacion  = reporte.get("fecha_creacion").toString();
        Timestamp fecha_creacion_format=  new Timestamp(sdf.parse(fecha_creacion).getTime());
        String nombre_creacion = reporte.get("nombre_creacion").toString();
        String titulo_reporte = reporte.get("titulo_reporte").toString();
        int id_tipo_reporte = Integer.parseInt(reporte.get("id_tipo_reporte").toString());
        String id_usuario  = reporte.get("id_usuario").toString();
        
		String resp = reporteRepository.crearReporte(comentario, extension, fecha_creacion_format,
				nombre_creacion, titulo_reporte, id_tipo_reporte, id_usuario); 
		
		return resp;
	}
	
	@Override
	public String eliminarReporte(Map<String, Object> reporte)throws ParseException {
		String resp = "";
		int id_reporte = Integer.parseInt(reporte.get("id_reporte").toString());
		boolean existeReporte = reporteRepository.existsById(id_reporte);
		
		
		if (!existeReporte) {
			resp =  "No se puede eliminar este producto";
		}
		else {
			System.out.println("Eliminar producto");
			try {
				reporteRepository.eliminarReporte(id_reporte);
				resp =  "Se eliminó el reporte correctamente";
			} catch (Exception e) {
				return "Error al eliminar reporte \n"
				+ "Mensaje: "+e.getMessage();
			}
		}
		
		return resp;
	}
	
	@Override
	public String modificarReporte(Map<String, Object> reporte) throws ParseException {
		
		int id_reporte = Integer.parseInt(reporte.get("id_reporte").toString());
		String comentario = reporte.get("comentario").toString();
		String extension  = reporte.get("extension").toString();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        String fecha_creacion  = reporte.get("fecha_creacion").toString();
        Timestamp fecha_creacion_format=  new Timestamp(sdf.parse(fecha_creacion).getTime());
        String nombre_creacion = reporte.get("nombre_creacion").toString();
        String titulo_reporte = reporte.get("titulo_reporte").toString();
        int id_tipo_reporte = Integer.parseInt(reporte.get("id_tipo_reporte").toString());
        String id_usuario  = reporte.get("id_usuario").toString();
        
		String resp = "";
		boolean existeReporte = reporteRepository.existsById(id_reporte);
		
		if (existeReporte) {
			System.out.println("Modificar reporte");
			try {
				reporteRepository.modificarReporte(id_reporte, comentario,
						extension, fecha_creacion_format,
						nombre_creacion, titulo_reporte, id_tipo_reporte,
						id_usuario);
				resp = "Se modificó correctamente el reporte";
			} catch (Exception e) {
				// TODO: handle exception
				return "Error al modificar reporte \n"
				+ "Mensaje: "+e.getMessage();
			}
		}
		else {
			System.out.println("No se puede modificar reporte");
		}
		
		return resp;
	}

	@Override
	public String obtenerTipoReporte() throws JSONException {
		
		String resp = "";
		
		List<TipoReporte> tpr = tipoReporteRepository.findAll();
		JSONObject objeto = new JSONObject();
		JSONArray list = new JSONArray();
		
		for (TipoReporte tipoReporte : tpr) {
			JSONObject tipo = new JSONObject();
			tipo.put("id_tipo_reporte", tipoReporte.getId_tipo_reporte());
			tipo.put("nombre_tipo_reporte", tipoReporte.getNombre_tipo_reporte());
			list.put(tipo);
		}
		
		resp = objeto.put("tipos_reporte", list).toString();		
		
		
		return resp;
	}

	@Override
	public String obtenerReportes() throws JSONException {
		
		String resp = "";
		
		List<Reporte> reportes = reporteRepository.findAll();
		JSONObject objeto = new JSONObject();
		JSONArray list = new JSONArray();
		
		for (Reporte reporte : reportes) {
			JSONObject tipo = new JSONObject();
			tipo.put("id_reporte", reporte.getId_reporte());
			tipo.put("comentario", reporte.getComentario());
			tipo.put("extension", reporte.getExtension());
			tipo.put("nombre_creacion", reporte.getNombre_creacion());
			tipo.put("titulo_reporte", reporte.getTitulo_reporte());
			tipo.put("fecha_creacion", reporte.getFecha_creacion());
			tipo.put("id_tipo_reporte", reporte.getTipo_reporte().getId_tipo_reporte());
			tipo.put("nombre_tipo_reporte", reporte.getTipo_reporte().getNombre_tipo_reporte());
			tipo.put("usuario", reporte.getUsuario().getId_usuario());
			tipo.put("eliminado", reporte.isEliminado());
			list.put(tipo);
		}
		
		resp = objeto.put("reportes", list).toString();		
		
		
		return resp;
	}
    
	
}
