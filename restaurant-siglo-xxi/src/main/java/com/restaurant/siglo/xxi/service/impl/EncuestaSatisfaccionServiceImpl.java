package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.repository.EncuestaSatisfaccionRepository;
import com.restaurant.siglo.xxi.service.EncuestaSatisfaccionService;

@Service
public class EncuestaSatisfaccionServiceImpl implements EncuestaSatisfaccionService{
	@Autowired
	EncuestaSatisfaccionRepository encuestaSatisfaccionRepository;
	
	@Override
	public String crearEncuestaSatisfaccion(Map<String, Object> encuestaSatisfaccion) {
		String resp = "";
		try {
			int puntuacion_comida = Integer.parseInt(encuestaSatisfaccion.get("puntuacion_comida").toString());
			int puntuacion_tiempo_atencion = Integer.parseInt(encuestaSatisfaccion.get("puntuacion_tiempo_atencion").toString());
			int puntuacion_trato_del_personal = Integer.parseInt(encuestaSatisfaccion.get("puntuacion_trato_del_personal").toString());
			int puntuacion_interaccion_sistema = Integer.parseInt(encuestaSatisfaccion.get("puntuacion_interaccion_sistema").toString());
			Boolean recomendado = Boolean.parseBoolean(encuestaSatisfaccion.get("recomendado").toString());
			Boolean vuelta = Boolean.parseBoolean(encuestaSatisfaccion.get("vuelta").toString());
			String comentario = encuestaSatisfaccion.get("comentario").toString();
			Timestamp fecha_encuesta =  new Timestamp(System.currentTimeMillis());
			int id_reserva = Integer.parseInt(encuestaSatisfaccion.get("id_reserva").toString());
			
			resp = encuestaSatisfaccionRepository.crearEncuestaSatisfaccion(puntuacion_comida, puntuacion_tiempo_atencion, puntuacion_trato_del_personal, puntuacion_interaccion_sistema, recomendado, vuelta, comentario, fecha_encuesta, id_reserva);
		} catch (Exception e) {
			return "Error al crear encuesta de satisfacción.\n"
					+ "Mensaje de error: "+ e.getMessage();
		}
		return resp;
	}
}
