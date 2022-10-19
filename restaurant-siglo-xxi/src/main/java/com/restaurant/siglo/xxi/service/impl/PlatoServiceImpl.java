package com.restaurant.siglo.xxi.service.impl;

import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Plato;
import com.restaurant.siglo.xxi.clases.TipoPlato;
import com.restaurant.siglo.xxi.repository.PlatoRepository;
import com.restaurant.siglo.xxi.repository.TipoPlatoRepository;
import com.restaurant.siglo.xxi.service.PlatoService;

@Service
public class PlatoServiceImpl implements PlatoService{
	
	@Autowired
    PlatoRepository platoRepository;
	
	@Autowired
    TipoPlatoRepository tipoPlatoRepository;
    
    @Override
    public String obtenerPlatos() throws JSONException {
        List<Plato> listado = platoRepository.findAll();
        JSONObject resp = new JSONObject();
        JSONArray listPlatos = new JSONArray();
        
        listado.forEach((plato) -> {
            try {
                JSONObject platos = new JSONObject();
                if (plato.isEliminado() == false) {                	
                	platos.put("id_plato", plato.getId_plato());
                	platos.put("cantidad_personas_recomendadas", plato.getCantidad_personas_recomendadas());
                	platos.put("nombre_plato", plato.getNombre_plato());
                	platos.put("precio_plato", plato.getPrecio_plato());
                	platos.put("comentario", plato.getComentario());
                	platos.put("descripcion_plato", plato.getDescripcion_plato());
                	platos.put("disponibilidad", plato.isDisponibilidad());
                	platos.put("id_tipo_plato", plato.getTipo_plato().getId_tipo_plato());
                	platos.put("nombre_tipo_plato", plato.getTipo_plato().getNombre_tipo_plato());
                	platos.put("descripcion_tipo_plato", plato.getTipo_plato().getDescripcion());
                	platos.put("eliminado", plato.isEliminado());
                	listPlatos.put(platos);
                }
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        });
        
        resp.put("plato", listPlatos);
        return  resp.toString();
    }
    
    @Override
	public String crearPlato(Map<String, Object> plato) {
		
		String resp = "";
		try {
			int id_plato = Integer.parseInt(plato.get("id_plato").toString());
			int cantidad_personas_recomendadas = Integer.parseInt(plato.get("cantidad_personas_recomendadas").toString());
			String comentario = plato.get("comentario").toString();
			String descripcion_plato  = plato.get("descripcion_plato").toString();
			boolean disponibilidad  = Boolean.parseBoolean(plato.get("disponibilidad").toString());
			String nombre_plato  = plato.get("nombre_plato").toString();
			int precio_plato = Integer.parseInt(plato.get("precio_plato").toString());
			int id_tipo_plato = Integer.parseInt(plato.get("id_tipo_plato").toString());
			boolean eliminado = Boolean.parseBoolean(plato.get("eliminado").toString());
			
			resp = platoRepository.crearPlato(id_plato, cantidad_personas_recomendadas, comentario,
					descripcion_plato, disponibilidad, nombre_plato,
					precio_plato, id_tipo_plato, eliminado); 
		} catch (Exception e) {
			return "Error al crear plato. \n"
					+ "Mensaje de error: "+ e.getMessage();
		}
		
		return resp;
	}

	@Override
	public String obtenerUnPlato(Map<String, Object> plato) {
		int id_plato = Integer.parseInt(plato.get("id_plato").toString());
		
		Plato unPlato = platoRepository.getById(id_plato);
		JSONObject resp = new JSONObject();
		
		try {			
			resp.put("id_plato", unPlato.getId_plato());
			resp.put("cantidad_personas_recomendadas", unPlato.getCantidad_personas_recomendadas());
			resp.put("comentario", unPlato.getComentario());
			resp.put("descripcion_plato", unPlato.getDescripcion_plato());
			resp.put("disponibilidad", unPlato.isDisponibilidad());
			resp.put("nombre_plato", unPlato.getNombre_plato());
			resp.put("precio_plato", unPlato.getPrecio_plato());
			resp.put("id_tipo_plato", unPlato.getTipo_plato().getId_tipo_plato()); //como un join pa rescatar los atributos de id tipo plato
			resp.put("nombre_tipo_plato", unPlato.getTipo_plato().getNombre_tipo_plato());
			resp.put("nombre_tipo_plato", unPlato.getTipo_plato().getDescripcion());
			
		} catch (Exception e) {
			return "Plato no existe. \n"
					+ "Mensaje de error: "+ e.getMessage();
		}
		
		return resp.toString();
	}

	@Override
	public String eliminarPlato(Map<String, Object> plato) {
		String resp = "";
		int id_plato = Integer.parseInt(plato.get("id_plato").toString());
		boolean existePlato = platoRepository.existsById(id_plato);
		
		
		if (!existePlato) {
			resp =  "No se puede eliminar este plato";
		}
		else {
			System.out.println("Eliminar plato");
			try {
				platoRepository.eliminarPlato(id_plato);
				resp =  "Se eliminó el plato correctamente";
			} catch (Exception e) {
				return "Error al eliminar plato \n"
				+ "Mensaje: "+e.getMessage();
			}
		}
		
		return resp;
	}
	
	@Override
	public String modificarPlato(Map<String, Object> plato) {
		

		int id_plato = Integer.parseInt(plato.get("id_plato").toString());
		int cantidad_personas_recomendadas = Integer.parseInt(plato.get("cantidad_personas_recomendadas").toString());
		String comentario = plato.get("comentario").toString();
		String descripcion_plato  = plato.get("descripcion_plato").toString();
		boolean disponibilidad  = Boolean.parseBoolean(plato.get("disponibilidad").toString());
		String nombre_plato  = plato.get("nombre_plato").toString();
		int precio_plato = Integer.parseInt(plato.get("precio_plato").toString());
		int id_tipo_plato = Integer.parseInt(plato.get("id_tipo_plato").toString());
		boolean eliminado = Boolean.parseBoolean(plato.get("eliminado").toString());
		String resp = platoRepository.modificarPlato(id_plato, cantidad_personas_recomendadas, comentario,
				descripcion_plato, disponibilidad, nombre_plato, precio_plato, id_tipo_plato, eliminado);
		
		return resp;
	}
	
	@Override
    public String obtenerTipoPlato() throws JSONException {
        
        List<TipoPlato> tipos = tipoPlatoRepository.findAll();
        JSONObject resp = new JSONObject();
        JSONArray listTipoPlato = new JSONArray();
        
        for (TipoPlato tipo : tipos) {
            try {
                JSONObject unTipoPlato = new JSONObject();
                unTipoPlato.put("id_tipo_plato", tipo.getId_tipo_plato());
                unTipoPlato.put("nombre_tipo_plato", tipo.getNombre_tipo_plato());
                listTipoPlato.put(unTipoPlato);
            } catch (Exception e) {
                // TODO: handle exception
            }
        }
        resp.put("list_tipoplato", listTipoPlato);
        
        return resp.toString();
    }

}
