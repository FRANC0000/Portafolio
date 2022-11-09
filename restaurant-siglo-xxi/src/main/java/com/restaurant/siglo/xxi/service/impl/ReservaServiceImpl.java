package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Cliente;
import com.restaurant.siglo.xxi.clases.Mesa;
import com.restaurant.siglo.xxi.clases.Reserva;
import com.restaurant.siglo.xxi.repository.ClienteRepository;
import com.restaurant.siglo.xxi.repository.MesaRepository;
import com.restaurant.siglo.xxi.repository.ReservaRepository;
import com.restaurant.siglo.xxi.service.ReservaService;

@Service
public class ReservaServiceImpl implements ReservaService {
	
	@Autowired
	ReservaRepository reservaRepository;
	
	@Autowired
	ClienteRepository clienteRepository;
	
	@Autowired
	MesaRepository mesaRepository;

	@Override
	public String ingresarReserva(Map<String, Object> ingresarReserva) throws ParseException {
		
		String resp = ""; 
		
		try {
			Map<String, Object> cliente = (Map<String, Object>) ingresarReserva.get("clienteAIngresar");
			Map<String, Object> reserva= (Map<String, Object>) ingresarReserva.get("reservaAIngresar");
			
			//Cliente
			int rut_cliente = Integer.parseInt(cliente.get("rut_cliente").toString());	
			String dv_cliente = cliente.get("dv_cliente").toString();
			String nombre_cliente = cliente.get("nombre_cliente").toString();
			Timestamp fecha_ingreso = new Timestamp(System.currentTimeMillis());
			
			boolean clienteExiste = clienteRepository.existsById(rut_cliente);
			if (!clienteExiste) {			
				clienteRepository.crearCliente(rut_cliente, dv_cliente, fecha_ingreso, nombre_cliente);
			}
			
			//Reserva
			int id_reserva = reservaRepository.nextValIdReserva();
			int id_estado_reserva = Integer.parseInt(reserva.get("id_estado_reserva").toString());
			int id_mesa = Integer.parseInt(reserva.get("id_mesa").toString());
			int rut_cliente_reserva= Integer.parseInt(reserva.get("rut_cliente").toString());
			int cant_consumidores = Integer.parseInt(reserva.get("cant_consumidores").toString());
			String fecha_reserva = reserva.get("fecha_reserva").toString();
			SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
			Timestamp fecha_reserva_formateada =  new Timestamp(sdf.parse(fecha_reserva).getTime());
			String hora_reseva = reserva.get("hora_reserva").toString();
			String comentario = reserva.get("comentario").toString();

			resp = reservaRepository.crearReserva(id_reserva, cant_consumidores, comentario, fecha_reserva_formateada, hora_reseva, rut_cliente_reserva, id_estado_reserva, id_mesa);
			
			if (resp.contains("creada satisfactoriamente")) {
				//Cambiar estado de mesa a 'Ocupado'
				Mesa estaMesa = mesaRepository.getById(id_mesa);
				String consola = mesaRepository.modificarMesa(id_mesa, estaMesa.getId_tipo_mesa().getId_tipo_mesa(), 2);
				System.out.println("Respuesta modificarMesa(): " + consola);
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al crear reserva \n"
					+ "Mensaje: " +e.getMessage();
		}
		
		return resp;
	}

	@Override
	public String cancelarReserva(Map<String, Object> cancelarReserva) throws ParseException {
		
		String resp = "";
		String id_reserva = cancelarReserva.get("id_reserva").toString();
		Reserva reserva = reservaRepository.getById(id_reserva);
	
		try {
			resp = reservaRepository.cancelarReserva(id_reserva);
			
			if (resp.contains("cancelada con éxito")) {
				//Cambiar estado de mesa a 'Disponible'
				String consola = mesaRepository.modificarMesa(reserva.getId_mesa().getId_mesa(), reserva.getId_mesa().getId_tipo_mesa().getId_tipo_mesa(), 1);
				System.out.println("Respuesta modificarMesa(): " + consola);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al cancelar reserva \n"
					+ "Mensaje: " +e.getMessage();
		}
		
		return resp;
	}

	@Override
	public String obtenerReservaActivaPorIdMesa(Map<String, Object> idMesa) throws ParseException {
		String resp = "";
		JSONObject listadoReservas = new JSONObject();
		JSONArray arrayReserva = new JSONArray();
		
		try {
			int id_mesa = Integer.parseInt(idMesa.get("id_mesa").toString());
			List<Reserva> listReserva = reservaRepository.obtenerReservaActivaPorIdMesa(id_mesa);
			if (listReserva.size() == 1) {
				for (Reserva reserva : listReserva) {
					JSONObject unaReserva = new JSONObject();
					unaReserva.put("id_reserva", reserva.getId_reserva());
					unaReserva.put("id_mesa", reserva.getId_mesa().getId_mesa());
					unaReserva.put("hora_reserva", reserva.getHora_reserva());
					unaReserva.put("fecha_reserva", reserva.getFecha_reserva());
					unaReserva.put("id_estado_reserva", reserva.getEstado_reserva().getId_estado_reserva());
					unaReserva.put("nombre_estado_reserva", reserva.getEstado_reserva().getNombre_estado_reserva());
					unaReserva.put("comentario", reserva.getComentario());
					unaReserva.put("rut_cliente", reserva.getCliente().getRut_cliente());
					unaReserva.put("dv_cliente", reserva.getCliente().getDv_cliente());
					unaReserva.put("nombre_cliente", reserva.getCliente().getNombre_cliente());
					unaReserva.put("cant_consumidores", reserva.getCant_consumidores());
					arrayReserva.put(unaReserva);
				}
				listadoReservas.put("arrayReserva", arrayReserva);
			}
			else {
				listadoReservas.put("arrayReserva", arrayReserva);
			}
		} catch (Exception e) {
			// TODO: handle exception
			return "Error al obtener reserva \n"
					+ "Mensaje: " +e.getMessage();		
		}

		
		return listadoReservas.toString();
	}
	
	@Override
	public String terminarEstancia(Map<String, Object> terminarEstancia) throws ParseException {
		
		String resp = "";
		String id_reserva = terminarEstancia.get("id_reserva").toString();
		Reserva reserva = reservaRepository.getById(id_reserva);
	
		try {
			resp = reservaRepository.cancelarReserva(id_reserva);
			
			if (resp.contains("cancelada con éxito")) {
				//Cambiar estado de mesa a 'Disponible'
				String consola = mesaRepository.modificarMesa(reserva.getId_mesa().getId_mesa(), reserva.getId_mesa().getId_tipo_mesa().getId_tipo_mesa(), 3);
				System.out.println("Respuesta modificarMesa(): " + consola);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al cancelar reserva \n"
					+ "Mensaje: " +e.getMessage();
		}
		
		return resp;
	}
	
	@Override
	public String disponibilizarMesa(Map<String, Object> disponibilizarMesa) throws ParseException {
		
		String resp = "";
	
		try {
			int id_mesa = Integer.parseInt(disponibilizarMesa.get("id_mesa").toString());
			Mesa mesa = mesaRepository.getById(id_mesa);

			String consola = mesaRepository.modificarMesa(mesa.getId_mesa(), mesa.getId_tipo_mesa().getId_tipo_mesa(), 1);
			System.out.println("Respuesta modificarMesa(): " + consola);
			resp = consola;
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al cancelar reserva \n"
					+ "Mensaje: " +e.getMessage();
		}
		
		return resp;
	}

}
