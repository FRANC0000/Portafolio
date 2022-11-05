package com.restaurant.siglo.xxi.service.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONException;
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
				if (mesa.isEliminado() == false) {					
					m.put("id_mesa", mesa.getId_mesa());
					m.put("id_estado_mesa", mesa.getId_estado_mesa().getId_estado_mesa());
					m.put("nombre_estado_mesa", mesa.getId_estado_mesa().getNombre_estado_mesa());
					m.put("id_tipo_mesa", mesa.getId_tipo_mesa().getId_tipo_mesa());
					m.put("nombre_tipo_mesa", mesa.getId_tipo_mesa().getNombre_tipo_mesa());
					m.put("cantidad_asientos", mesa.getId_tipo_mesa().getCantidad_asientos());
					listMesas.put(m);
				}
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
	public String crearMesa(Map<String, Object> mesa) {
		
		System.out.println("Crear mesa");
		String resp = "";
		try {
			int id_tipo_mesa = Integer.parseInt(mesa.get("id_tipo_mesa").toString());
			int id_estado_mesa = Integer.parseInt(mesa.get("id_estado_mesa").toString());
			resp = mesaRepository.crearMesa(id_tipo_mesa,id_estado_mesa);
		} catch (Exception e) {
			// TODO: handle exception
			return "Error al crear mesa \n"
			+ "Mensaje: "+e.getMessage();
		}
		
		
		return resp;
	}

	@Override
	public String obtenerUnaMesa(Map<String, Object> idMesa) {
		JSONObject unaMesaJSON = new JSONObject();
		
		try {
			int id_mesa = Integer.parseInt(idMesa.get("id_mesa").toString());		
			Mesa unaMesa = mesaRepository.getById(id_mesa);
			
			unaMesaJSON.put("id_mesa", unaMesa.getId_mesa());
			unaMesaJSON.put("id_estado_mesa", unaMesa.getId_estado_mesa().getId_estado_mesa());
			unaMesaJSON.put("nombre_estado_mesa", unaMesa.getId_estado_mesa().getNombre_estado_mesa());
			unaMesaJSON.put("id_tipo_mesa", unaMesa.getId_tipo_mesa().getId_tipo_mesa());
			unaMesaJSON.put("nombre_tipo_mesa", unaMesa.getId_tipo_mesa().getNombre_tipo_mesa());
			unaMesaJSON.put("cantidad_asientos", unaMesa.getId_tipo_mesa().getCantidad_asientos());
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			return "Error al crear mesa \n"
			+ "Mensaje: "+e.getMessage();
		}
		
		return unaMesaJSON.toString();
	}
	
	@Override
	public String modificarMesa(Map<String, Object> mesa) {
		
		String resp = "";
		try {
			int id_mesa = Integer.parseInt(mesa.get("id_mesa").toString());
			int id_estado_mesa = Integer.parseInt(mesa.get("id_estado_mesa").toString());
			int id_tipo_mesa = Integer.parseInt(mesa.get("id_tipo_mesa").toString());
			resp = mesaRepository.modificarMesa(id_mesa, id_tipo_mesa, id_estado_mesa);
		} catch (Exception e) {
			// TODO: handle exception
			return "Error al modificar mesa \n"
			+ "Mensaje: "+e.getMessage();
		}
		
		
		return resp;
	}
	
	@Override
	public String eliminarMesa(Map<String, Object> mesa) {
		String resp = "";
		int id_mesa = Integer.parseInt(mesa.get("id_mesa").toString());
		boolean existeMesa = mesaRepository.existsById(id_mesa);
		
		if (!existeMesa) {
			resp =  "No se puede eliminar esta mesa";
		}
		else {
			System.out.println("Eliminar mesa");
			try {
				mesaRepository.eliminarMesa(id_mesa);
				resp =  "Se eliminó la mesa correctamente";
			} catch (Exception e) {
				return "Error al eliminar mesa \n"
				+ "Mensaje: "+e.getMessage();
			}
		}
		
		return resp;
	}
}
