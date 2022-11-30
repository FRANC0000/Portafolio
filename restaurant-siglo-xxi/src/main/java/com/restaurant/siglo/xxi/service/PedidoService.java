package com.restaurant.siglo.xxi.service;

import java.text.ParseException;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface PedidoService {
	
	public String ingresarPedido(Map<String, Object> ingresarPedido) throws ParseException;
	public String modificarInstanciaPedido(Map<String, Object> modificarInstanciaPedido) throws ParseException;
	public String obtenerPedidosPorIdBoleta(Map<String, Object> idBoleta) throws ParseException;
	public String obtenerPedidosEnCola();
	public String obtenerPedidosEnPreparacion();
	public String obtenerPedidosParaEntregar();
	public String obtenerPedidosEntregadosHoy();
	public String obtenerPedidoPorId(int id_pedido);
}
