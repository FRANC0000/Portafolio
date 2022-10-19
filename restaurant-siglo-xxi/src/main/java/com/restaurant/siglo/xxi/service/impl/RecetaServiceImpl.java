package com.restaurant.siglo.xxi.service.impl;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Receta;
import com.restaurant.siglo.xxi.repository.RecetaRepository;
import com.restaurant.siglo.xxi.service.RecetaService;

@Service
public class RecetaServiceImpl implements RecetaService{
	@Autowired
	RecetaRepository recetaRepository;

	@Override
	public String modificarReceta(Map<String, Object> receta) {		

		int id_receta = Integer.parseInt(receta.get("id_receta").toString());
		String comentario = receta.get("comentario").toString();
		int tiempo_preparacion = Integer.parseInt(receta.get("tiempoPreparacion").toString());
		String complejidad = receta.get("complejidad").toString();
		boolean eliminado = Boolean.parseBoolean(receta.get("eliminado").toString());
		
		
		String resp = recetaRepository.modificarReceta(id_receta, comentario, complejidad, tiempo_preparacion, eliminado); 
	
		
		return resp;
	}
	
	@Override
    public String crearReceta(Map<String, Object> receta) {
        String resp = "";
        try {
            int id_receta = Integer.parseInt(receta.get("id_receta").toString());
            String comentario = receta.get("comentario").toString();
            String complejidad  = receta.get("complejidad").toString();
            int tiempoPreparacion = Integer.parseInt(receta.get("tiempoPreparacion").toString());
            
            resp = recetaRepository.crearReceta(id_receta, comentario, complejidad,
                    tiempoPreparacion); 
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
