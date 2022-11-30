package com.restaurant.siglo.xxi.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface EncuestaSatisfaccionService {
	String crearEncuestaSatisfaccion(Map<String, Object> encuestaSatisfaccion);
}
