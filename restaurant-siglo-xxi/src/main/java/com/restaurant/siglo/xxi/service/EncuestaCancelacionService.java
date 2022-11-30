package com.restaurant.siglo.xxi.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface EncuestaCancelacionService {
	String crearEncuestaCancelacion(Map<String, Object> encuestaCancelacion);

	
}
