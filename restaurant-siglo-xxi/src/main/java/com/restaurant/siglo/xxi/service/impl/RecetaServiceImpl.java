package com.restaurant.siglo.xxi.service.impl;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonObject;
import com.restaurant.siglo.xxi.clases.Producto;
import com.restaurant.siglo.xxi.clases.ProductosReceta;
import com.restaurant.siglo.xxi.clases.Receta;
import com.restaurant.siglo.xxi.repository.ProductoRepository;
import com.restaurant.siglo.xxi.repository.ProductosRecetaRepository;
import com.restaurant.siglo.xxi.repository.RecetaRepository;
import com.restaurant.siglo.xxi.service.ProductosRecetaService;
import com.restaurant.siglo.xxi.service.RecetaService;

@Service
public class RecetaServiceImpl implements RecetaService{
	@Autowired
	RecetaRepository recetaRepository;
	
	@Autowired
	ProductosRecetaService productosRecetaService;
	
	@Autowired
	ProductosRecetaRepository productosRecetaRepository;
	
	@Autowired
	ProductoRepository productoRepository;

	@Override
	public String modificarReceta(Map<String, Object> receta) {		

		int id_receta = Integer.parseInt(receta.get("id_receta").toString());
		String comentario = receta.get("comentario").toString();
		int tiempo_preparacion = Integer.parseInt(receta.get("tiempoPreparacion").toString());
		String complejidad = receta.get("complejidad").toString();
		
		String resp = recetaRepository.modificarReceta(id_receta, comentario, complejidad, tiempo_preparacion); 
	
		
		return resp;
	}
	
	@Override
    public String crearReceta(Map<String, Object> receta) {
        String resp = "";
        try {
            String comentario = receta.get("comentario").toString();
            String complejidad  = receta.get("complejidad").toString();
            int tiempoPreparacion = Integer.parseInt(receta.get("tiempoPreparacion").toString());
            List<Map<String,Object>> productosEnReceta = (List<Map<String, Object>>) receta.get("productosEnReceta");
            
            resp = recetaRepository.crearReceta(comentario, complejidad,tiempoPreparacion); 
            
            productosRecetaService.crearProductosEnUnaReceta(Integer.parseInt(resp), productosEnReceta);
            
        } catch (Exception e) {
            return "Error al crear receta. \n"
                    + "Mensaje de error: "+ e.getMessage();
        }
        
        return resp;
    }
	
	@Override
    public String obtenerUnaReceta(Map<String, Object> receta) {
        int id_receta = Integer.parseInt(receta.get("id_receta").toString());
        
        Receta unaReceta = recetaRepository.getById(id_receta);
        JSONObject resp = new JSONObject();
        
        try {           
            resp.put("id_receta", unaReceta.getId_receta());
            resp.put("comentario", unaReceta.getComentario());
            resp.put("complejidad", unaReceta.getComplejidad());
            resp.put("tiempoPreparacion", unaReceta.getTiempo_preparacion());
        } catch (Exception e) {
            return "Receta no existe. \n"
                    + "Mensaje de error: "+ e.getMessage();
        }
        
        return resp.toString();
    }
	
	@Override
    public String eliminarReceta(Map<String, Object> receta) {
        int id_receta = Integer.parseInt(receta.get("id_receta").toString());
        String resp = "";
        
        
        try {           
           recetaRepository.eliminarReceta(id_receta);
           resp = "Se elimino la receta correctamente";
        } catch (Exception e) {
            return "Receta no existe. \n"
                    + "Mensaje de error: "+ e.getMessage();
        }
        
        return resp;
	}
	
	@Override
    public String obtenerRecetas() {
        List<Receta> recetas = recetaRepository.findAll();
        
        JSONObject listadoRecetas = new JSONObject();
        JSONArray listRecetas = new JSONArray();
        String resp = "";
        
        
        try {
            for (Receta receta : recetas) {
                JSONObject m = new JSONObject();
                if (receta.isEliminado() == false) {
                    m.put("id_receta", receta.getId_receta());
                    m.put("comentario", receta.getComentario());
                    m.put("complejidad", receta.getComplejidad());
                    m.put("tiempo_preparacion", receta.getTiempo_preparacion());
                    
                    List<ProductosReceta> productosEnUnaReceta = productosRecetaRepository.obtenerProductosDeUnaReceta(receta.getId_receta());
                    
                    JSONArray listaProductosEnUnaReceta = new JSONArray();
                    for (ProductosReceta unProductoEnUnaReceta : productosEnUnaReceta) {
						JSONObject unProducto = new JSONObject();
						Producto prod = productoRepository.getById(unProductoEnUnaReceta.getProductosRecetaId().getId_producto());
						JSONObject pro = new JSONObject();
						pro.put("id_producto", prod.getId_producto());
						pro.put("stock", prod.getStock_producto());
						pro.put("valor_unitario", prod.getValor_unitario());
						pro.put("comentario", prod.getComentario());
						pro.put("fecha_ingreso", prod.getFecha_ingreso_producto());
						pro.put("fecha_vencimiento", prod.getFecha_vencimiento());
						pro.put("medida_producto", prod.getMedida_producto());
						pro.put("nombre_imagen", prod.getNombre_archivo());
						pro.put("nombre_producto", prod.getNombre_producto());
						pro.put("id_tipo_producto", prod.getTipoProducto().getId_tipo_producto());
						pro.put("nombre_tipo_producto", prod.getTipoProducto().getNombre_tipo_producto());
						pro.put("comentario_tipo_producto", prod.getTipoProducto().getComentario());
						
						unProducto.put("producto", pro);
						unProducto.put("cantidad", unProductoEnUnaReceta.getCantidad_producto());
						unProducto.put("comentario", unProductoEnUnaReceta.getComentario());
						listaProductosEnUnaReceta.put(unProducto);
					}
                    m.put("productosEnUnaReceta", listaProductosEnUnaReceta);
                    
                    listRecetas.put(m);
                }
                
            }
            listadoRecetas.put("listado_recetas",listRecetas);
            resp = listadoRecetas.toString();
        } catch (Exception e) {
            // TODO: handle exception
            return "Error al cargar recetas \n"
                    + "Mensaje: " + e.getMessage();
        }
    
        return resp; 
    }
}
