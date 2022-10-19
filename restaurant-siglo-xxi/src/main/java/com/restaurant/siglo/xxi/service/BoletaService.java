package com.restaurant.siglo.xxi.service;

import java.text.ParseException;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface BoletaService {
	
	public String instanciarBoleta(Map<String, Object> boletaAIngresar) throws ParseException;
	public String obtenerBoletaEnProcesoPorIdCliente(Map<String, Object> idCliente) throws ParseException;
	public String boletaAModificar(Map<String, Object> boletaAModificar) throws ParseException;
	
	
}
