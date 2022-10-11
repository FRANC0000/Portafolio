package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Producto;
import com.restaurant.siglo.xxi.repository.ProductoRepository;
import com.restaurant.siglo.xxi.service.ProductoService;

@Service
public class ProductoServiceImpl implements ProductoService{
	
	@Autowired
    ProductoRepository productoRepository;
    
    @Override
    public String obtenerProductos() throws JSONException {
        List<Producto> listado = productoRepository.findAll();
        JSONObject resp = new JSONObject();
        JSONArray listPlatos = new JSONArray();
        
        listado.forEach((producto) -> {
            try {
                JSONObject productos = new JSONObject();
                productos.put("id_plato", producto.getId_producto());
                productos.put("comentario", producto.getComentario());
                productos.put("fecha_ingreso_producto", producto.getFecha_ingreso_producto());
                productos.put("fecha_vencimiento", producto.getFecha_vencimiento());
                productos.put("medida_producto", producto.getMedida_producto());
                productos.put("descripcion_plato", producto.getNombre_producto());
                productos.put("stock_producto", producto.getStock_producto());
                productos.put("valor_unitario", producto.getValor_unitario());
                productos.put("id_tipo_producto", producto.getTipoProducto().getId_tipo_producto());
                productos.put("tipo_producto_comentario", producto.getTipoProducto().getComentario());
                productos.put("nombre_tipo_producto", producto.getTipoProducto().getNombre_tipo_producto());
                listPlatos.put(productos);
            } catch (JSONException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        });
        
        resp.put("plato", listPlatos);
        return  resp.toString();
    }
    
    @Override
	public String crearProducto(Map<String, Object> producto) throws ParseException {
		
		int id_producto = Integer.parseInt(producto.get("id_producto").toString());
		String comentario = producto.get("comentario").toString();
		String fecha_ingreso_producto  = producto.get("fecha_ingreso_producto").toString();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Timestamp fecha_ingreso_producto_format=  new Timestamp(sdf.parse(fecha_ingreso_producto).getTime());
        String fecha_vencimiento  = producto.get("fecha_vencimiento").toString();
        Timestamp fecha_vencimiento_format=  new Timestamp(sdf.parse(fecha_vencimiento).getTime());
		String medida_producto  = producto.get("medida_producto").toString();
		String nombre_producto = producto.get("nombre_producto").toString();
		int stock_producto = Integer.parseInt(producto.get("stock_producto").toString());
		int valor_unitario = Integer.parseInt(producto.get("valor_unitario").toString());
		int tipo_producto = Integer.parseInt(producto.get("tipo_producto").toString());

		String resp = productoRepository.crearProducto(id_producto, comentario, fecha_ingreso_producto_format, fecha_vencimiento_format,
				medida_producto, nombre_producto, stock_producto, valor_unitario, tipo_producto); 
		
		return resp;
	}
    
    @Override
	public String eliminarProducto(Map<String, Object> producto)throws ParseException {
		String resp = "";
		int id_producto = Integer.parseInt(producto.get("id_producto").toString());
		boolean existeProducto = productoRepository.existsById(id_producto);
		
		
		if (!existeProducto) {
			resp =  "No se puede eliminar este producto";
		}
		else {
			System.out.println("Eliminar producto");
			try {
				productoRepository.eliminarProducto(id_producto);
				resp =  "Se eliminó el producto correctamente";
			} catch (Exception e) {
				return "Error al eliminar producto \n"
				+ "Mensaje: "+e.getMessage();
			}
		}
		
		return resp;
	}
    
    @Override
	public String modificarProducto(Map<String, Object> producto) throws ParseException {
		

		int id_producto = Integer.parseInt(producto.get("id_producto").toString());
		String comentario = producto.get("comentario").toString();
		String fecha_ingreso_producto  = producto.get("fecha_ingreso_producto").toString();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        Timestamp fecha_ingreso_producto_format=  new Timestamp(sdf.parse(fecha_ingreso_producto).getTime());
        String fecha_vencimiento  = producto.get("fecha_vencimiento").toString();
        Timestamp fecha_vencimiento_format=  new Timestamp(sdf.parse(fecha_vencimiento).getTime());
		String medida_producto  = producto.get("medida_producto").toString();
		String nombre_producto = producto.get("nombre_producto").toString();
		int stock_producto = Integer.parseInt(producto.get("stock_producto").toString());
		int valor_unitario = Integer.parseInt(producto.get("valor_unitario").toString());
		int tipo_producto = Integer.parseInt(producto.get("tipo_producto").toString());
		String resp = "";
		boolean existeProducto = productoRepository.existsById(id_producto);
		
		if (existeProducto) {
			System.out.println("Modificar producto");
			try {
				productoRepository.modificarProducto(id_producto, comentario, fecha_ingreso_producto_format, fecha_vencimiento_format,
						medida_producto, nombre_producto, stock_producto, valor_unitario, tipo_producto);
				resp = "Se modificó correctamente el producto";
			} catch (Exception e) {
				// TODO: handle exception
				return "Error al modificar producto \n"
				+ "Mensaje: "+e.getMessage();
			}
		}
		else {
			System.out.println("No se puede modificar producto");
		}
		
		return resp;
	}
}
