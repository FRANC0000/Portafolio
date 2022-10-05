package com.restaurant.siglo.xxi.service.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.EstadoMesa;
import com.restaurant.siglo.xxi.clases.Mesa;
import com.restaurant.siglo.xxi.clases.TipoMesa;
import com.restaurant.siglo.xxi.repository.EstadoMesaRepository;
import com.restaurant.siglo.xxi.repository.MesaRepository;
import com.restaurant.siglo.xxi.repository.TipoMesaRepository;
import com.restaurant.siglo.xxi.service.MesaService;

@Service
public class MesaServiceImpl implements MesaService{
	
	@Autowired
	MesaRepository mesaRepository;
	
	@Autowired
	EstadoMesaRepository estadoMesaRepository;
	
	@Autowired
	TipoMesaRepository tipoMesaRepository;

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

	@Override
	public String crearMesa(Mesa mesa) {
		
		String resp = "";
		int id_mesa = mesa.getId_mesa();
		int id_estado_mesa = mesa.getId_estado_mesa().getId_estado_mesa();
		int id_tipo_mesa = mesa.getId_tipo_mesa().getId_tipo_mesa();		
		boolean existeMesa = mesaRepository.existsById(id_mesa);
		boolean existeEstadoMesa = estadoMesaRepository.existsById(id_estado_mesa);
		boolean existeTipoMesa = tipoMesaRepository.existsById(id_tipo_mesa);
		
		if (existeMesa && existeEstadoMesa && existeTipoMesa) {
			resp =  "No se puede crear esta mesa";
		}
		else {
			System.out.println("Crear mesa");
			try {
				resp = mesaRepository.crearMesa(mesa.getId_mesa(), mesa.getId_tipo_mesa().getId_tipo_mesa(), mesa.getId_estado_mesa().getId_estado_mesa());
			} catch (Exception e) {
				// TODO: handle exception
				return "Error al crear mesa \n"
				+ "Mensaje: "+e.getMessage();
			}
		}
		
		return resp;
	}
}
