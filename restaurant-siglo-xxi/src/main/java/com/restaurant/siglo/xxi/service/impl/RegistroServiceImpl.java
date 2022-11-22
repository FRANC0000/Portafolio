package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Registro;
import com.restaurant.siglo.xxi.clases.Reporte;
import com.restaurant.siglo.xxi.repository.RegistroRepository;
import com.restaurant.siglo.xxi.repository.ReporteRepository;
import com.restaurant.siglo.xxi.service.RegistroService;

@Service
public class RegistroServiceImpl implements RegistroService{
	@Autowired
	RegistroRepository registroRepository;
	
	@Autowired
	ReporteRepository reporteRepository;
	
	@Override
	public String crearRegistro(Map<String, Object> registro) {
		String descripcion = registro.get("descripcion").toString();
		Timestamp fecha_instancia = new Timestamp(System.currentTimeMillis());
		Date d = new Date();
		String hora_instancia = ""+d.getHours()+":"+d.getMinutes();
		String titulo_registro = registro.get("titulo_registro").toString();		
		int id_estado_registro = Integer.parseInt(registro.get("id_estado_registro").toString());
		int id_modulo = Integer.parseInt(registro.get("id_modulo").toString());
		int id_tipo_registro = Integer.parseInt(registro.get("id_tipo_registro").toString());
		int id_registro_padre = Integer.parseInt(registro.get("id_registro_padre").toString());
		int version = Integer.parseInt(registro.get("version").toString());
		String id_usuario = registro.get("id_usuario").toString();

		String resp = registroRepository.crearRegistro(descripcion, fecha_instancia, hora_instancia, titulo_registro, id_estado_registro, id_modulo, id_tipo_registro, id_usuario, id_registro_padre, version); 
		
		return resp;
	}
	
	@Override
	public String obtenerRegistros() throws JSONException {
		
		String resp = "";
		
		List<Registro> registros = registroRepository.findAll();
		JSONObject objeto = new JSONObject();
		JSONArray list = new JSONArray();
		
		for (Registro reg : registros) {
			JSONObject tipo = new JSONObject();
			tipo.put("id_registro", reg.getId_registro());
			tipo.put("descripcion", reg.getDescripcion());
			tipo.put("id_estado_registro", reg.getEstado_registro().getId_estado_registro());;
			tipo.put("nombre_estado_registro", reg.getEstado_registro().getNombre_estado_registro());;
			tipo.put("fecha_instancia", reg.getFecha_instancia());
			tipo.put("hora_instancia", reg.getHora_instancia());
			tipo.put("id_modulo", reg.getModulo().getId_modulo());
			tipo.put("id_tipo_registro", reg.getTipo_registro().getId_tipo_registro());
			tipo.put("titulo_registro", reg.getTitulo_registro());
			tipo.put("id_usuario", reg.getUsuario().getId_usuario());
			tipo.put("id_registro_padre", reg.getId_registro_padre());
			tipo.put("version", reg.getVersion());
			
			JSONObject objReporte = new JSONObject();
			Reporte rep = reporteRepository.getById(reg.getId_reporte());
			objReporte.put("id_reporte", rep.getId_reporte());
			objReporte.put("extension", rep.getExtension());
			objReporte.put("comentario", rep.getComentario());
			objReporte.put("nombre_creacion", rep.getNombre_creacion());
			objReporte.put("id_tipo_reporte", rep.getTipo_reporte().getId_tipo_reporte());
			objReporte.put("nombre_tipo_reporte", rep.getTipo_reporte().getId_tipo_reporte());
			objReporte.put("titulo_reporte", rep.getTitulo_reporte());
			objReporte.put("id_usuario", rep.getUsuario().getId_usuario());
			
			tipo.put("reporte", objReporte);

			list.put(tipo);
		}
		
		resp = objeto.put("registros", list).toString();		
		
		
		return resp;
	}

	@Override
	public String obtenerSolicitudReabastecimiento() throws JSONException {
		
		String resp = "";
		List<Registro> registros = registroRepository.obtenerSolicitudReabastecimiento();
		JSONObject objeto = new JSONObject();
		JSONArray list = new JSONArray();
		
		for (Registro reg : registros) {
			JSONObject tipo = new JSONObject();
			tipo.put("id_registro", reg.getId_registro());
			tipo.put("descripcion", reg.getDescripcion());
			tipo.put("id_estado_registro", reg.getEstado_registro().getId_estado_registro());;
			tipo.put("nombre_estado_registro", reg.getEstado_registro().getNombre_estado_registro());;
			tipo.put("fecha_instancia", reg.getFecha_instancia());
			tipo.put("hora_instancia", reg.getHora_instancia());
			tipo.put("id_modulo", reg.getModulo().getId_modulo());
			tipo.put("id_tipo_registro", reg.getTipo_registro().getId_tipo_registro());
			tipo.put("titulo_registro", reg.getTitulo_registro());
			tipo.put("id_usuario", reg.getUsuario().getId_usuario());
			tipo.put("id_registro_padre", reg.getId_registro_padre());
			tipo.put("version", reg.getVersion());
			
			JSONObject objReporte = new JSONObject();
			Reporte rep = reporteRepository.getById(reg.getId_reporte());
			objReporte.put("id_reporte", rep.getId_reporte());
			objReporte.put("extension", rep.getExtension());
			objReporte.put("comentario", rep.getComentario());
			objReporte.put("nombre_creacion", rep.getNombre_creacion());
			objReporte.put("id_tipo_reporte", rep.getTipo_reporte().getId_tipo_reporte());
			objReporte.put("nombre_tipo_reporte", rep.getTipo_reporte().getId_tipo_reporte());
			objReporte.put("titulo_reporte", rep.getTitulo_reporte());
			objReporte.put("id_usuario", rep.getUsuario().getId_usuario());
			
			tipo.put("reporte", objReporte);


			list.put(tipo);
		}
		
		resp = objeto.put("registros", list).toString();		
		
		return resp;
	}

	@Override
	public String obtenerSolicitudReabastecimientoFinanzas() throws JSONException {
		
		String resp = "";
		List<Registro> registros = registroRepository.obtenerSolicitudReabastecimientoFinanzas();
		JSONObject objeto = new JSONObject();
		JSONArray list = new JSONArray();
		
		for (Registro reg : registros) {
			JSONObject tipo = new JSONObject();
			tipo.put("id_registro", reg.getId_registro());
			tipo.put("descripcion", reg.getDescripcion());
			tipo.put("id_estado_registro", reg.getEstado_registro().getId_estado_registro());;
			tipo.put("nombre_estado_registro", reg.getEstado_registro().getNombre_estado_registro());;
			tipo.put("fecha_instancia", reg.getFecha_instancia());
			tipo.put("hora_instancia", reg.getHora_instancia());
			tipo.put("id_modulo", reg.getModulo().getId_modulo());
			tipo.put("id_tipo_registro", reg.getTipo_registro().getId_tipo_registro());
			tipo.put("titulo_registro", reg.getTitulo_registro());
			tipo.put("id_usuario", reg.getUsuario().getId_usuario());
			tipo.put("id_registro_padre", reg.getId_registro_padre());
			tipo.put("version", reg.getVersion());
			
			JSONObject objReporte = new JSONObject();
			Reporte rep = reporteRepository.getById(reg.getId_reporte());
			objReporte.put("id_reporte", rep.getId_reporte());
			objReporte.put("extension", rep.getExtension());
			objReporte.put("comentario", rep.getComentario());
			objReporte.put("nombre_creacion", rep.getNombre_creacion());
			objReporte.put("id_tipo_reporte", rep.getTipo_reporte().getId_tipo_reporte());
			objReporte.put("nombre_tipo_reporte", rep.getTipo_reporte().getId_tipo_reporte());
			objReporte.put("titulo_reporte", rep.getTitulo_reporte());
			objReporte.put("id_usuario", rep.getUsuario().getId_usuario());
			
			tipo.put("reporte", objReporte);


			list.put(tipo);
		}
		
		resp = objeto.put("registros", list).toString();		
		
		return resp;
	}
}
