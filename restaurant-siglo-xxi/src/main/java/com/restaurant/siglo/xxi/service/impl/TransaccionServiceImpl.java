package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.CarteraPagos;
import com.restaurant.siglo.xxi.clases.Transaccion;
import com.restaurant.siglo.xxi.repository.TransaccionRepository;
import com.restaurant.siglo.xxi.service.TransaccionService;
import com.restaurant.siglo.xxi.service.UsuarioService;

@Service
public class TransaccionServiceImpl implements TransaccionService{
	
	@Autowired
	TransaccionRepository transaccionRepository;

	@Override
	public String crearTransaccion(Map<String, Object> trans) throws JSONException {
		
		String resp = "";
		try {
			//rut_cliente integer,fecha_emision timestamp,id_boleta integer,valor integer,id_cartera_pago integer
			int rut_cliente = Integer.parseInt(trans.get("rut_cliente").toString());
			Timestamp fecha_emision = new Timestamp(System.currentTimeMillis());
			int id_boleta = Integer.parseInt(trans.get("id_boleta").toString());
			int valor = Integer.parseInt(trans.get("valor").toString());
			int id_cartera_pago = Integer.parseInt(trans.get("id_cartera_pagos").toString());
			
			resp = transaccionRepository.crearTransaccion(rut_cliente, fecha_emision, id_boleta, valor, id_cartera_pago);
			
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error en crearTransaccion()";
		}
		
		return resp;
	}
	
	@Override
	public String obtenerTransaccionPorIdBoleta(Map<String, Object> card) throws JSONException {
		// TODO Auto-generated method stub
		String resp = "";
		try {
			int id_boleta = Integer.parseInt(card.get("id_boleta").toString());
			
			Transaccion trans = transaccionRepository.obtenerTransaccionPorIdBoleta(id_boleta);
			
			JSONObject objeto = new JSONObject();
			objeto.put("id_boleta", trans.getId_boleta());
			objeto.put("id_cartera_pagos", trans.getId_cartera_pagos());
			objeto.put("id_cliente", trans.getId_cliente());
			objeto.put("id_transaccion", trans.getId_transaccion());
			objeto.put("valor", trans.getValor());
			objeto.put("fecha_emision", trans.getFecha_emision());
			
			resp = objeto.toString();
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error en obtenerCarteraPagosPorIdCliente()";
		}
		
		return resp;
	}

}
