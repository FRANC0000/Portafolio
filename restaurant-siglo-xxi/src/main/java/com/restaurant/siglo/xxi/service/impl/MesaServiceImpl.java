package com.restaurant.siglo.xxi.service.impl;

import java.util.Iterator;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Mesa;
import com.restaurant.siglo.xxi.repository.MesaRepository;
import com.restaurant.siglo.xxi.service.MesaService;

@Service
public class MesaServiceImpl implements MesaService{
	
	@Autowired
	MesaRepository mesaRepository;

	@Override
	public String obtenerMesas() {
		List<Mesa> mesas = mesaRepository.findAll();
		
		JSONObject listadoMesas = new JSONObject();
		JSONArray listMesas = new JSONArray();
		String resp = "";
		
		try {
			for (Mesa mesa : mesas) {
				JSONObject m = new JSONObject();
				m.put("id_mesa", mesa.getId_mesa());
				m.put("id_estado_mesa", mesa.getId_estado_mesa().getId_estado_mesa());
				m.put("nombre_estado_mesa", mesa.getId_estado_mesa().getNombre_estado_mesa());
				m.put("id_tipo_mesa", mesa.getId_tipo_mesa().getId_tipo_mesa());
				m.put("nombre_tipo_mesa", mesa.getId_tipo_mesa().getNombre_tipo_mesa());
				m.put("cantidad_asientos", mesa.getId_tipo_mesa().getCantidad_asientos());
				listMesas.put(m);
			}
			listadoMesas.put("listado_mesas", listMesas);
			resp = listadoMesas.toString();
		} catch (Exception e) {
			// TODO: handle exception
			return "Error al cargar mesas \n"
					+ "Mensaje: " + e.getMessage();
		}
	
		return resp; 
	}
}
