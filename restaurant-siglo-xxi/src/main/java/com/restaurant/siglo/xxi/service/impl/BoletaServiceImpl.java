package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Boleta;
import com.restaurant.siglo.xxi.clases.PlatosPedido;
import com.restaurant.siglo.xxi.clases.PlatosPedidoId;
import com.restaurant.siglo.xxi.repository.BoletaRepository;
import com.restaurant.siglo.xxi.repository.PedidoRepository;
import com.restaurant.siglo.xxi.repository.PlatosPedidoRepository;
import com.restaurant.siglo.xxi.repository.ProductosPedidoRepository;
import com.restaurant.siglo.xxi.service.BoletaService;

@Service
public class BoletaServiceImpl implements BoletaService{
	
	@Autowired
	BoletaRepository boletaRepository;
	@Autowired
	PedidoRepository pedidoRepository;
	@Autowired
	PlatosPedidoRepository platosPedidoRepository;
	@Autowired
	ProductosPedidoRepository productosPedidoRepository;
	
	@Override
	public String instanciarBoleta(Map<String, Object> boletaAIngresar) throws ParseException {
		String resp = "";
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		int id_boleta = -1;
		try {
			//INSTANCIAR BOLETA
			Map<String, Object> boleta = (Map<String, Object>) boletaAIngresar.get("boleta");
			if (boleta.get("id_boleta") != null) {
				id_boleta = Integer.parseInt(boleta.get("id_boleta").toString());
				int subtotal = Integer.parseInt(boleta.get("subtotal").toString());
				System.out.println("EXISTENTE ID Boleta "+ id_boleta);
				System.out.println("MODIFICAR SUBTOTAL ID Boleta "+ subtotal);
				
				//AQUI SE MODIFICA EL SUBTOTAL DE LA BOLETA
			}
			else {
				id_boleta = boletaRepository.nextValIdBoleta();
				System.out.println("NUEVO ID Boleta"+ id_boleta);
				//int descuentos = Integer.parseInt(boletaAIngresar.get("descuentos").toString());
				//int extras = Integer.parseInt(boletaAIngresar.get("extras").toString());
				String fecha_atencion = boleta.get("fechaAtencion").toString();
				Timestamp fecha_atencion_formateada =  new Timestamp(sdf.parse(fecha_atencion).getTime());
				String hora_atencion = boleta.get("horaAtencion").toString();
				//String hora_emision = boletaAIngresar.get("horaEmision").toString();
				int subtotal = Integer.parseInt(boleta.get("subtotal").toString());
				//int total = Integer.parseInt(boletaAIngresar.get("total").toString());
				int id_cliente = Integer.parseInt(boleta.get("rutCliente").toString());
				//id_estado_boleta = Integer.parseInt(boletaAIngresar.get("idEstadoBoleta").toString());
				//int id_tipo_pago = Integer.parseInt(boletaAIngresar.get("idTipoPago").toString());
				String id_usuario = boleta.get("idUsuario").toString();
				boletaRepository.crearBoleta(id_boleta, -1, -1, fecha_atencion_formateada, hora_atencion, "-1", subtotal, -1, id_cliente, 1, -1, id_usuario);
			}
			resp = ""+id_boleta;
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al instanciar boleta \n"
					+ "Mensaje: "+ e.getMessage();
		}		
		return resp;
	}

	@Override
	public String obtenerBoletaEnProcesoPorIdCliente(Map<String, Object> idCliente) throws ParseException {
		
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		JSONArray arrayResp = new JSONArray();
		try {
			int id_cliente = Integer.parseInt(idCliente.get("id_cliente").toString());
			
			List<Boleta> listBoletas = boletaRepository.obtenerBoletaEnProcesoPorIdCliente(id_cliente);
			
			for (Boleta boleta : listBoletas) {
				JSONObject unaBoleta= new JSONObject();			
				Date fecha_date = boleta.getFecha_atencion(); 
				String fecha_atencion_formateada =  formatter.format(fecha_date);
				unaBoleta.put("id_boleta", boleta.getId_boleta());
				unaBoleta.put("id_cliente", id_cliente);
				unaBoleta.put("id_usuario", boleta.getUsuario().getId_usuario());
				unaBoleta.put("id_tipo_pago", boleta.getTipoPago().getId_tipo_pago());
				unaBoleta.put("nombre_tipo_pago", boleta.getTipoPago().getNombre_tipo_pago());
				unaBoleta.put("fecha_atencion", fecha_atencion_formateada);
				unaBoleta.put("hora_atencion", boleta.getHora_atencion());
				unaBoleta.put("hora_emision", boleta.getHora_emision());
				unaBoleta.put("subtotal", boleta.getSubtotal());
				unaBoleta.put("total", boleta.getTotal());
				unaBoleta.put("descuentos", boleta.getDescuentos());
				unaBoleta.put("extras", boleta.getExtras());
				unaBoleta.put("id_estado_boleta", boleta.getEstadoBoleta().getId_estado_boleta());
				unaBoleta.put("nombre_estado_boleta", boleta.getEstadoBoleta().getNombre_estado_boleta());
				arrayResp.put(unaBoleta);				
			}
			objetoResp.put("boleta", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener boleta \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}
	
	@Override
	public String boletaAModificar(Map<String, Object> boletaAModificar) throws ParseException {
		String resp = "";
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		int id_boleta = -1;
		try {
			//MODIFICAR BOLETA
			Map<String, Object> boleta = (Map<String, Object>) boletaAModificar.get("boleta");
			if (boleta.get("id_boleta") != null) {
				id_boleta = Integer.parseInt(boleta.get("id_boleta").toString());
				int subtotal = Integer.parseInt(boleta.get("subtotal").toString());
				int descuentos = Integer.parseInt(boleta.get("descuentos").toString());
				int extras = Integer.parseInt(boleta.get("extras").toString());
				String fecha_atencion = boleta.get("fechaAtencion").toString();
				Timestamp fecha_atencion_formateada =  new Timestamp(sdf.parse(fecha_atencion).getTime());
				String hora_atencion = boleta.get("horaAtencion").toString();
				String hora_emision = boleta.get("horaEmision").toString();
				int total = Integer.parseInt(boleta.get("total").toString());
				int id_cliente = Integer.parseInt(boleta.get("rutCliente").toString());
				int id_estado_boleta = Integer.parseInt(boleta.get("idEstadoBoleta").toString());
				int id_tipo_pago = Integer.parseInt(boleta.get("idTipoPago").toString());
				String id_usuario = boleta.get("idUsuario").toString();
				boletaRepository.modificarBoleta(id_boleta, descuentos, extras, fecha_atencion_formateada, hora_atencion, hora_emision, subtotal, total, id_cliente, id_estado_boleta, id_tipo_pago, id_usuario);
			}			
			resp = ""+id_boleta;
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al modificar boleta \n"
					+ "Mensaje: "+ e.getMessage();
		}		
		return resp;
	}
	
	@Override
	public String obtenerBoletasPorPagarEnCaja(){
		
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		JSONArray arrayResp = new JSONArray();
		try {			
			List<Boleta> listBoletas = boletaRepository.obtenerBoletasPorPagarEnCaja();
			
			for (Boleta boleta : listBoletas) {
				JSONObject unaBoleta= new JSONObject();			
				Date fecha_date = boleta.getFecha_atencion(); 
				String fecha_atencion_formateada =  formatter.format(fecha_date);
				unaBoleta.put("id_boleta", boleta.getId_boleta());
				unaBoleta.put("id_cliente", boleta.getCliente().getRut_cliente());
				unaBoleta.put("id_usuario", boleta.getUsuario().getId_usuario());
				unaBoleta.put("id_tipo_pago", boleta.getTipoPago().getId_tipo_pago());
				unaBoleta.put("nombre_tipo_pago", boleta.getTipoPago().getNombre_tipo_pago());
				unaBoleta.put("fecha_atencion", fecha_atencion_formateada);
				unaBoleta.put("hora_atencion", boleta.getHora_atencion());
				unaBoleta.put("hora_emision", boleta.getHora_emision());
				unaBoleta.put("subtotal", boleta.getSubtotal());
				unaBoleta.put("total", boleta.getTotal());
				unaBoleta.put("descuentos", boleta.getDescuentos());
				unaBoleta.put("extras", boleta.getExtras());
				unaBoleta.put("id_estado_boleta", boleta.getEstadoBoleta().getId_estado_boleta());
				unaBoleta.put("nombre_estado_boleta", boleta.getEstadoBoleta().getNombre_estado_boleta());
				arrayResp.put(unaBoleta);				
			}
			objetoResp.put("boleta", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener boleta \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}

	@Override
	public String obtenerBoletasPago1Reabastecimiento() {
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		JSONArray arrayResp = new JSONArray();
		try {			
			List<Boleta> listBoletas = boletaRepository.obtenerBoletasPago1Reabastecimiento();
			
			for (Boleta boleta : listBoletas) {
				JSONObject unaBoleta= new JSONObject();			
				Date fecha_date = boleta.getFecha_atencion(); 
				String fecha_atencion_formateada =  formatter.format(fecha_date);
				unaBoleta.put("id_boleta", boleta.getId_boleta());
				unaBoleta.put("id_cliente", boleta.getCliente().getRut_cliente());
				unaBoleta.put("id_usuario", boleta.getUsuario().getId_usuario());
				unaBoleta.put("id_tipo_pago", boleta.getTipoPago().getId_tipo_pago());
				unaBoleta.put("nombre_tipo_pago", boleta.getTipoPago().getNombre_tipo_pago());
				unaBoleta.put("fecha_atencion", fecha_atencion_formateada);
				unaBoleta.put("hora_atencion", boleta.getHora_atencion());
				unaBoleta.put("hora_emision", boleta.getHora_emision());
				unaBoleta.put("subtotal", boleta.getSubtotal());
				unaBoleta.put("total", boleta.getTotal());
				unaBoleta.put("descuentos", boleta.getDescuentos());
				unaBoleta.put("extras", boleta.getExtras());
				unaBoleta.put("id_estado_boleta", boleta.getEstadoBoleta().getId_estado_boleta());
				unaBoleta.put("nombre_estado_boleta", boleta.getEstadoBoleta().getNombre_estado_boleta());
				arrayResp.put(unaBoleta);				
			}
			objetoResp.put("boleta", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener boleta \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}

	@Override
	public String obtenerBoletasPago2Reabastecimiento() {
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		JSONArray arrayResp = new JSONArray();
		try {			
			List<Boleta> listBoletas = boletaRepository.obtenerBoletasPago2Reabastecimiento();
			
			for (Boleta boleta : listBoletas) {
				JSONObject unaBoleta= new JSONObject();			
				Date fecha_date = boleta.getFecha_atencion(); 
				String fecha_atencion_formateada =  formatter.format(fecha_date);
				unaBoleta.put("id_boleta", boleta.getId_boleta());
				unaBoleta.put("id_cliente", boleta.getCliente().getRut_cliente());
				unaBoleta.put("id_usuario", boleta.getUsuario().getId_usuario());
				unaBoleta.put("id_tipo_pago", boleta.getTipoPago().getId_tipo_pago());
				unaBoleta.put("nombre_tipo_pago", boleta.getTipoPago().getNombre_tipo_pago());
				unaBoleta.put("fecha_atencion", fecha_atencion_formateada);
				unaBoleta.put("hora_atencion", boleta.getHora_atencion());
				unaBoleta.put("hora_emision", boleta.getHora_emision());
				unaBoleta.put("subtotal", boleta.getSubtotal());
				unaBoleta.put("total", boleta.getTotal());
				unaBoleta.put("descuentos", boleta.getDescuentos());
				unaBoleta.put("extras", boleta.getExtras());
				unaBoleta.put("id_estado_boleta", boleta.getEstadoBoleta().getId_estado_boleta());
				unaBoleta.put("nombre_estado_boleta", boleta.getEstadoBoleta().getNombre_estado_boleta());
				arrayResp.put(unaBoleta);				
			}
			objetoResp.put("boleta", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener boleta \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}

}
