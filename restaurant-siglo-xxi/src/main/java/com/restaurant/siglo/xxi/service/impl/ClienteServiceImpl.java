package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.repository.ClienteRepository;
import com.restaurant.siglo.xxi.service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {
	
	@Autowired
	ClienteRepository clienteRepository;
	
	@Override
	public String modificarCliente(Map<String, Object> cliente) throws ParseException {
		
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		int rut_cliente = Integer.parseInt(cliente.get("rut_cliente").toString());
		String dv_cliente = cliente.get("dv_cliente").toString();		
		
		
		String fecha_ingreso  = cliente.get("fecha_ingreso").toString();
        Timestamp fecha_ingreso_format =  new Timestamp(sdf.parse(fecha_ingreso).getTime());		
		String nombre_cliente = cliente.get("nombre_cliente").toString();
		
		String resp = clienteRepository.modificarCliente(rut_cliente, dv_cliente, fecha_ingreso_format, nombre_cliente); 
	
		
		return resp;
	}

}
