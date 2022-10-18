package com.restaurant.siglo.xxi.controller;

import java.text.ParseException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.PedidoService;
import com.restaurant.siglo.xxi.service.ReservaService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/pedido")
public class PedidoController {
	
	@Autowired
	PedidoService pedidoService;
	
	@RequestMapping(value="/ingresarPedido")
	public String ingresarPedido(@RequestBody Map<String, Object> ingresarPedido) {
		
		String resp = "";
		try {
			resp = pedidoService.ingresarPedido(ingresarPedido);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerPedidosPorIdBoleta")
	public String obtenerPedidosPorIdBoleta(@RequestBody Map<String, Object> idBoleta) {
		
		String resp = "";
		try {
			resp = pedidoService.obtenerPedidosPorIdBoleta(idBoleta);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
}
