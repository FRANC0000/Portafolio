package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

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
				String consola = mesaRepository.modificarMesa(id_mesa, 2);
			}
			
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al crear reserva \n"
					+ "Mensaje: " +e.getMessage();
		}
		
		return resp;
	}

}
