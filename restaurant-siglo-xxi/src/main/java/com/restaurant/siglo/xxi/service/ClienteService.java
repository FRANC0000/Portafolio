package com.restaurant.siglo.xxi.service;

import java.text.ParseException;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface ClienteService {
	public String modificarCliente(Map<String, Object> cliente) throws ParseException;

}
