package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.repository.EncuestaCancelacionRepository;
import com.restaurant.siglo.xxi.service.EncuestaCancelacionService;


@Service
public class EncuestaCancelacionServiceImpl implements EncuestaCancelacionService{
	@Autowired
	EncuestaCancelacionRepository encuestaCancelacionRepository;
	
	@Override
	public String crearEncuestaCancelacion(Map<String, Object> encuestaCancelacion) {
		String resp = "";
		try {
			String motivo = encuestaCancelacion.get("motivo").toString();
			int puntuacion_atencion = Integer.parseInt(encuestaCancelacion.get("puntuacion_atencion").toString());
			String comentario = encuestaCancelacion.get("comentario").toString();
			Timestamp fecha_encuesta =  new Timestamp(System.currentTimeMillis());
			int id_reserva = Integer.parseInt(encuestaCancelacion.get("id_reserva").toString());
			
			resp = encuestaCancelacionRepository.crearEncuestaCancelacion(motivo, puntuacion_atencion, comentario, fecha_encuesta, id_reserva);
		} catch (Exception e) {
			return "Error al crear encuesta de cancelación.\n"
					+ "Mensaje de error: "+ e.getMessage();
		}
		return resp;
	}
}
