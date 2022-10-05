package com.restaurant.siglo.xxi.service.impl;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.TipoMesa;
import com.restaurant.siglo.xxi.repository.EstadoMesaRepository;
import com.restaurant.siglo.xxi.repository.TipoMesaRepository;
import com.restaurant.siglo.xxi.service.TipoMesaService;

@Service
public class TipoMesaServiceImpl implements TipoMesaService{
	
	@Autowired
	TipoMesaRepository tipoMesaRepository;

	@Override
	public String obtenerTipoMesa() {
		
		List<TipoMesa> tipoMesaList = tipoMesaRepository.findAll();
		JSONObject resp = new JSONObject();
		JSONArray list = new JSONArray();
		
		try {			
			for (TipoMesa tipoMesa : tipoMesaList) {
				JSONObject tM = new JSONObject();
				tM.put("id_tipo_mesa", tipoMesa.getId_tipo_mesa());
				tM.put("nombre_tipo_mesa", tipoMesa.getNombre_tipo_mesa());
				tM.put("cantidad_asientos", tipoMesa.getCantidad_asientos());
				list.put(tM);				
			}
			resp.put("tipoMesa", list);	
			
		} catch (Exception e) {
			// TODO: handle exception
			return "Error al listar tipos de mesa \n"
			+ "Mensaje: "+e.getMessage();
		}
		return resp.toString();
	}

}
