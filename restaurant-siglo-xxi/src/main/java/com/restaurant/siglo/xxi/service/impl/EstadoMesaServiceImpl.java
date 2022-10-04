package com.restaurant.siglo.xxi.service.impl;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.EstadoMesa;
import com.restaurant.siglo.xxi.repository.EstadoMesaRepository;
import com.restaurant.siglo.xxi.service.EstadoMesaService;

@Service
public class EstadoMesaServiceImpl implements EstadoMesaService{
	
	@Autowired
	EstadoMesaRepository estadoMesaRepository;

	@Override
	public String obtenerEstadoMesa() {
		
		List<EstadoMesa> listarEstadoMesa = estadoMesaRepository.findAll();
		JSONObject listadoEstadoMesa = new JSONObject();
		JSONArray listEstadoMesa = new JSONArray();
		
		try {
			for (EstadoMesa estadoMesa : listarEstadoMesa) {
				JSONObject estadoMesaObj= new JSONObject();
				estadoMesaObj.put("id_estado_mesa", estadoMesa.getId_estado_mesa());				
				estadoMesaObj.put("nombre_estado_mesa", estadoMesa.getNombre_estado_mesa());
				listEstadoMesa.put(estadoMesaObj);
			}
			listadoEstadoMesa.put("listEstadoMesa", listEstadoMesa);
		} catch (Exception e) {
			// TODO: handle exception
			return "Error al listar estados de mesa \n"
					+ "Mensaje: "+e.getMessage();
		}
		
		
		return listadoEstadoMesa.toString();
	}

}
