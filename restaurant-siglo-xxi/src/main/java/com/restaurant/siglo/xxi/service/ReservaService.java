package com.restaurant.siglo.xxi.service;

import java.text.ParseException;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface ReservaService {
	
	public String ingresarReserva(Map<String, Object> ingresarReserva) throws ParseException;

}
