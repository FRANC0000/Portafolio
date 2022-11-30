package com.restaurant.siglo.xxi.controller;

import java.text.ParseException;
import java.util.Map;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.restaurant.siglo.xxi.service.ProductoService;

@Controller
@RestController
@RequestMapping("/rest-rsxii/producto")
public class ProductoController {
	
	@Autowired
    ProductoService  productoService;
    
    @RequestMapping(value="/obtenerProductos")
    public String obtenerProductos() throws JSONException{
        String listProductos = productoService.obtenerProductos();
        return listProductos;
    }
    
    @RequestMapping(value="/crearProducto")
	public String crearProducto(@RequestBody Map<String, Object> producto) {
		
		String resp = "";
		try {
			resp = productoService.crearProducto(producto);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return resp;	
	}
    
    @RequestMapping(value="/eliminarProducto")
	public String eliminarProducto(@RequestBody Map<String, Object> producto) throws ParseException{
		String resp = productoService.eliminarProducto(producto);
		return resp;
	}
    
    @RequestMapping(value="/modificarProducto")
	public String modificarProducto(@RequestBody Map<String, Object> producto) throws ParseException {		
		String resp = productoService.modificarProducto(producto);		
		return resp;	
	}
    
    @RequestMapping(value="/obtenerUnProducto")
    public String obtenerUnProducto(@RequestBody Map<String, Object> producto) throws ParseException {
        
        String resp = productoService.obtenerUnProducto(producto);
        
        return resp;    
    }
    
    @RequestMapping(value="/restarStock")
    public String restarStock(@RequestBody Map<String, Object> producto) throws ParseException {
        
        String resp = productoService.restarStock(producto);
        
        return resp;    
    }
    
    @RequestMapping(value="/carritoRestarStock")
    public String carritoRestarStock(@RequestBody Map<String, Object> carrito) throws ParseException {
        
        String resp = productoService.carritoRestarStock(carrito);
        
        return resp;    
    }
    
    @RequestMapping(value="/obtenerTipoProducto")
    public String obtenerTipoProducto() throws JSONException, ParseException{
        String listTipoProducto = productoService.obtenerTipoProducto();
        return listTipoProducto;
    }

}
