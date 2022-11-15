package com.restaurant.siglo.xxi.service.impl;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.CarteraPagos;
import com.restaurant.siglo.xxi.repository.CarteraPagosRepository;
import com.restaurant.siglo.xxi.service.CarteraPagosService;

@Service
public class CarteraPagosServiceImpl implements CarteraPagosService{
	
	@Autowired
	CarteraPagosRepository carteraPagosRepository;

	@Override
	public String crearCarteraPagos(Map<String, Object> card) throws JSONException {
		String resp = "";
		
			//rut_cliente integer,nro_tarjeta integer,mes_exp integer,anno_exp integer,cvv integer,email varchar,nombre_titular varchar,rut_titular varchar
			int rut_cliente = Integer.parseInt(card.get("rut_cliente").toString());
			String nro_tarjeta = card.get("nro_tarjeta").toString();
			String email = card.get("email").toString();
			String rut_titular = card.get("rut_titular").toString();
			String nombre_titular = card.get("nombre_titular").toString();
			int mes_exp = Integer.parseInt(card.get("mes_exp").toString());
			int anno_exp = Integer.parseInt(card.get("anno_exp").toString());
			int cvv = Integer.parseInt(card.get("cvv").toString());
			
			//select crear_cartera_pago(20392004, '1111222233334444', 12, 22, 333, 'f.teran.p22@gmail.com', 'Franco Terán Peña', '20392004-0')
			resp = carteraPagosRepository.crearCarteraPagos(rut_cliente, nro_tarjeta, mes_exp, anno_exp, cvv, email, nombre_titular, rut_titular);
			
			
		
		return resp;
	}

	@Override
	public String obtenerCarteraPagosPorIdCliente(Map<String, Object> card) throws JSONException {
		// TODO Auto-generated method stub
		String resp = "";
		try {
			int rut_cliente = Integer.parseInt(card.get("rut_cliente").toString());
			
			List<CarteraPagos> tarjetas = carteraPagosRepository.obtenerCarteraPagoPorIdCliente(rut_cliente);
			
			JSONObject objeto = new JSONObject();
			JSONArray listaTarjetas = new JSONArray();
			for (CarteraPagos tarjeta : tarjetas) {
				JSONObject unaTarjeta = new JSONObject();
				unaTarjeta.put("id_cartera_pagos", tarjeta.getId_cartera_pagos());
				unaTarjeta.put("anno_exp", tarjeta.getAnno_exp());
				unaTarjeta.put("cvv", tarjeta.getCvv());
				unaTarjeta.put("id_cliente", tarjeta.getId_cliente());
				unaTarjeta.put("mes_exp", tarjeta.getMes_exp());
				unaTarjeta.put("email", tarjeta.getEmail());
				unaTarjeta.put("nombre_titular", tarjeta.getNombre_titular());
				unaTarjeta.put("nro_tarjeta", tarjeta.getNro_tarjeta());
				unaTarjeta.put("rut_titular", tarjeta.getRut_titular());
				
				listaTarjetas.put(unaTarjeta);
			}
			
			objeto.put("listaTarjetas", listaTarjetas);
			resp = obtenerCarteraPagosPorIdCliente(card).toString();
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error en obtenerCarteraPagosPorIdCliente()";
		}
		
		return resp;
	}

}
