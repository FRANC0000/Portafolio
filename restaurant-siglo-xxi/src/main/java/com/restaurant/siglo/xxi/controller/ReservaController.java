package com.restaurant.siglo.xxi.controller;

import java.text.ParseException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.ReservaService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/reserva")
public class ReservaController {
	
	@Autowired
	ReservaService reservaService;
	
	@RequestMapping(value="/ingresarReserva")
	public String ingresarReserva(@RequestBody Map<String, Object> ingresarReserva) {
		
		String resp = "";
		try {
			resp = reservaService.ingresarReserva(ingresarReserva);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
	@RequestMapping(value="/cancelarReserva")
	public String cancelarReserva(@RequestBody Map<String, Object> cancelarReserva) {
		
		String resp = "";
		try {
			resp = reservaService.cancelarReserva(cancelarReserva);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
	@RequestMapping(value="/obtenerReservaActivaPorIdMesa")
	public String obtenerReservaActivaPorIdMesa(@RequestBody Map<String, Object> idMesa) {
		
		String resp = "";
		try {
			resp = reservaService.obtenerReservaActivaPorIdMesa(idMesa);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
	@RequestMapping(value="/terminarEstancia")
	public String terminarEstancia(@RequestBody Map<String, Object> terminarEstancia) {
		
		String resp = "";
		try {
			resp = reservaService.terminarEstancia(terminarEstancia);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
	
	@RequestMapping(value="/disponibilizarMesa")
	public String disponibilizarMesa(@RequestBody Map<String, Object> disponibilizarMesa) {
		
		String resp = "";
		try {
			resp = reservaService.disponibilizarMesa(disponibilizarMesa);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}

}
