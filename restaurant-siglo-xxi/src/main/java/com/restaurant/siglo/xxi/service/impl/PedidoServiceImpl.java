package com.restaurant.siglo.xxi.service.impl;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.restaurant.siglo.xxi.clases.Boleta;
import com.restaurant.siglo.xxi.clases.Pedido;
import com.restaurant.siglo.xxi.clases.Plato;
import com.restaurant.siglo.xxi.clases.PlatosPedido;
import com.restaurant.siglo.xxi.clases.Producto;
import com.restaurant.siglo.xxi.clases.ProductosPedido;
import com.restaurant.siglo.xxi.repository.PedidoRepository;
import com.restaurant.siglo.xxi.repository.PlatoRepository;
import com.restaurant.siglo.xxi.repository.PlatosPedidoRepository;
import com.restaurant.siglo.xxi.repository.ProductoRepository;
import com.restaurant.siglo.xxi.repository.ProductosPedidoRepository;
import com.restaurant.siglo.xxi.service.PedidoService;

@Service
public class PedidoServiceImpl implements PedidoService {
	
	@Autowired
	PedidoRepository pedidoRepository;
	@Autowired
	PlatosPedidoRepository platosPedidoRepository;
	@Autowired
	ProductosPedidoRepository productosPedidoRepository;
	@Autowired
	PlatoRepository platoRepository;
	@Autowired
	ProductoRepository productoRepository;

	@Override
	public String ingresarPedido(Map<String, Object> ingresarPedido) throws ParseException {
		String resp = "";
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		try {
			Map<String, Object> pedido = (Map<String, Object>) ingresarPedido.get("pedido");
			List<Map<String, Object>> carrito = (List<Map<String, Object>>) pedido.get("carritoProductos");
			String fecha_ingreso = pedido.get("fechaIngreso").toString();
			Timestamp fecha_ingreso_formateada =  new Timestamp(sdf.parse(fecha_ingreso).getTime());
			int id_estado_instancia = Integer.parseInt(pedido.get("idEstadoIinstancia").toString());
			int id_mesa = Integer.parseInt(pedido.get("idMesa").toString());
			int rut_cliente = Integer.parseInt(pedido.get("rutCliente").toString());
			int subtotalUnPedido = Integer.parseInt(pedido.get("subtotal").toString());
			int id_boleta = Integer.parseInt(pedido.get("idBoleta").toString());
			
			int id_pedido = pedidoRepository.nextValIdPedido();
			System.out.println("ID Pedido"+ id_pedido);
			
			pedidoRepository.crearPedido(id_pedido, fecha_ingreso_formateada, rut_cliente, id_estado_instancia, id_mesa, subtotalUnPedido, id_boleta);
	
			
			for (Map<String, Object> unItem : carrito) {
				boolean esProducto = Boolean.parseBoolean(unItem.get("esProducto").toString());
				boolean esPlato = Boolean.parseBoolean(unItem.get("esPlato").toString());
				int cantidad = Integer.parseInt(unItem.get("cantidad").toString());
				
				//INSERTAR FILAS EN PLATOS PEDIDO O PRODUCTOS PEDIDO SEGÚN EL TIPO DE ITEM EN EL CARRO										
				if (esPlato && !esProducto) {
					//System.out.println("Este es un plato y tengo que ingresarlo en platos_pedido");
					Map<String, Object> unPlato = (Map<String, Object>) unItem.get("plato");
					int id_plato = Integer.parseInt(unPlato.get("id_plato").toString());
					List<Integer> rec = (List<Integer>) unItem.get("recetaSeleccionada");
					String recetaSeleccionada = rec.toString();
					platosPedidoRepository.crearPlatosPedido(id_pedido, id_plato, cantidad, recetaSeleccionada);
				}
				else if (esProducto && !esPlato) {
					//System.out.println("Este es un producto y tengo que ingresarlo en productos_pedido");
					Map<String, Object> unProducto = (Map<String, Object>) unItem.get("producto");
					int id_producto = Integer.parseInt(unProducto.get("id_producto").toString());
					productosPedidoRepository.crearProductosPedido(id_pedido, id_producto, cantidad);
				}
			}
			resp = ""+id_pedido;
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al instanciar boleta \n"
					+ "Mensaje: "+ e.getMessage();
		}
		return resp;
	}

	@Override
	public String obtenerPedidosPorIdBoleta(Map<String, Object> idBoleta) throws ParseException {
		
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		JSONArray arrayResp = new JSONArray();
		try {
			int id_boleta = Integer.parseInt(idBoleta.get("id_boleta").toString());
			
			List<Pedido> listPedido = pedidoRepository.obtenerPedidosPorIdBoleta(id_boleta);
			
			for (Pedido pedido : listPedido) {
				JSONObject unPedido = new JSONObject();	
				unPedido.put("id_pedido", pedido.getId_pedido());
				unPedido.put("id_cliente", pedido.getCliente().getRut_cliente());
				unPedido.put("id_mesa", pedido.getMesa().getId_mesa());
				unPedido.put("fecha_ingreso", pedido.getFecha_ingreso());
				unPedido.put("id_estado_instancia", pedido.getEstadoInstancia().getId_estado_instancia());
				unPedido.put("nombre_estado_instancia", pedido.getEstadoInstancia().getNombre_estado_instancia());
				unPedido.put("id_boleta", pedido.getBoleta().getId_boleta());
				unPedido.put("subtotal", pedido.getSubtotal());
				
				JSONArray listPlatosEnUnPedido = new JSONArray();
				List<PlatosPedido> platosEnUnPedido = platosPedidoRepository.obtenerPlatosPorIdPedido(pedido.getId_pedido());
				for (PlatosPedido unPlatoEnUnPedido : platosEnUnPedido) {
					JSONObject unPlato = new JSONObject();
					Plato objetoPlato = platoRepository.getById(unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("id_plato", unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("cantidad_platos_en_pedido", unPlatoEnUnPedido.getCantidad_platos());
					
					unPlato.put("cantidad_personas_recomendadas", objetoPlato.getCantidad_personas_recomendadas());
					unPlato.put("precio_plato", objetoPlato.getPrecio_plato());
					unPlato.put("comentario_plato", objetoPlato.getComentario());
					unPlato.put("descripcion_plato", objetoPlato.getDescripcion_plato());
					unPlato.put("disponibilidad_plato", objetoPlato.isDisponibilidad());
					unPlato.put("nombre_plato", objetoPlato.getNombre_plato());
					unPlato.put("id_tipo_plato", objetoPlato.getTipo_plato().getId_tipo_plato());
					unPlato.put("nombre_tipo_plato", objetoPlato.getTipo_plato().getNombre_tipo_plato());
					unPlato.put("descripcion_tipo_plato", objetoPlato.getTipo_plato().getDescripcion());					
					listPlatosEnUnPedido.put(unPlato);
				}
				unPedido.put("platos_del_pedido" , listPlatosEnUnPedido);
				
				JSONArray listProductosEnUnPedido = new JSONArray();
				List<ProductosPedido> productosEnUnPedido = productosPedidoRepository.obtenerProductosPorIdPedido(pedido.getId_pedido());
				for (ProductosPedido unProductoEnUnPedido : productosEnUnPedido) {
					JSONObject unProducto = new JSONObject();
					Producto objetoProducto = productoRepository.getById(unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("id_producto", unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("cantidad_productos_en_pedido", unProductoEnUnPedido.getCantidad_producto());
					
					unProducto.put("stock_producto", objetoProducto.getStock_producto());
					unProducto.put("valor_unitario_producto", objetoProducto.getValor_unitario());
					unProducto.put("comentario_producto", objetoProducto.getComentario());
					unProducto.put("fecha_ingreso_producto", objetoProducto.getFecha_ingreso_producto());
					unProducto.put("fecha_vencimiento_producto", objetoProducto.getFecha_vencimiento());
					unProducto.put("medida_producto", objetoProducto.getMedida_producto());
					unProducto.put("nombre_producto", objetoProducto.getNombre_producto());
					unProducto.put("id_tipo_producto", objetoProducto.getTipoProducto().getId_tipo_producto());
					unProducto.put("nombre_tipo_producto", objetoProducto.getTipoProducto().getNombre_tipo_producto());
					unProducto.put("comentario_tipo_producto", objetoProducto.getTipoProducto().getComentario());
					listProductosEnUnPedido.put(unProducto);
				}
				unPedido.put("productos_del_pedido" , listProductosEnUnPedido);
				
				arrayResp.put(unPedido);
			}
			objetoResp.put("pedidos", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener pedidos \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}
	
	@Override
	public String obtenerPedidosEnCola() {
		
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		JSONArray arrayResp = new JSONArray();
		try {
			
			List<Pedido> listPedido = pedidoRepository.obtenerPedidosEnCola();
			
			for (Pedido pedido : listPedido) {
				JSONObject unPedido = new JSONObject();	
				unPedido.put("id_pedido", pedido.getId_pedido());
				unPedido.put("id_cliente", pedido.getCliente().getRut_cliente());
				unPedido.put("id_mesa", pedido.getMesa().getId_mesa());
				unPedido.put("fecha_ingreso", pedido.getFecha_ingreso());
				unPedido.put("id_estado_instancia", pedido.getEstadoInstancia().getId_estado_instancia());
				unPedido.put("nombre_estado_instancia", pedido.getEstadoInstancia().getNombre_estado_instancia());
				unPedido.put("id_boleta", pedido.getBoleta().getId_boleta());
				unPedido.put("subtotal", pedido.getSubtotal());
				
				JSONArray listPlatosEnUnPedido = new JSONArray();
				List<PlatosPedido> platosEnUnPedido = platosPedidoRepository.obtenerPlatosPorIdPedido(pedido.getId_pedido());
				for (PlatosPedido unPlatoEnUnPedido : platosEnUnPedido) {
					JSONObject unPlato = new JSONObject();
					Plato objetoPlato = platoRepository.getById(unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("id_plato", unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("cantidad_platos_en_pedido", unPlatoEnUnPedido.getCantidad_platos());
					
					unPlato.put("cantidad_personas_recomendadas", objetoPlato.getCantidad_personas_recomendadas());
					unPlato.put("precio_plato", objetoPlato.getPrecio_plato());
					unPlato.put("comentario_plato", objetoPlato.getComentario());
					unPlato.put("descripcion_plato", objetoPlato.getDescripcion_plato());
					unPlato.put("disponibilidad_plato", objetoPlato.isDisponibilidad());
					unPlato.put("nombre_plato", objetoPlato.getNombre_plato());
					unPlato.put("id_tipo_plato", objetoPlato.getTipo_plato().getId_tipo_plato());
					unPlato.put("nombre_tipo_plato", objetoPlato.getTipo_plato().getNombre_tipo_plato());
					unPlato.put("descripcion_tipo_plato", objetoPlato.getTipo_plato().getDescripcion());					
					unPlato.put("recetas_pedidas", unPlatoEnUnPedido.getRecetas_pedidas());
					listPlatosEnUnPedido.put(unPlato);
				}
				unPedido.put("platos_del_pedido" , listPlatosEnUnPedido);
				
				JSONArray listProductosEnUnPedido = new JSONArray();
				List<ProductosPedido> productosEnUnPedido = productosPedidoRepository.obtenerProductosPorIdPedido(pedido.getId_pedido());
				for (ProductosPedido unProductoEnUnPedido : productosEnUnPedido) {
					JSONObject unProducto = new JSONObject();
					Producto objetoProducto = productoRepository.getById(unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("id_producto", unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("cantidad_productos_en_pedido", unProductoEnUnPedido.getCantidad_producto());
					
					unProducto.put("stock_producto", objetoProducto.getStock_producto());
					unProducto.put("valor_unitario_producto", objetoProducto.getValor_unitario());
					unProducto.put("comentario_producto", objetoProducto.getComentario());
					unProducto.put("fecha_ingreso_producto", objetoProducto.getFecha_ingreso_producto());
					unProducto.put("fecha_vencimiento_producto", objetoProducto.getFecha_vencimiento());
					unProducto.put("medida_producto", objetoProducto.getMedida_producto());
					unProducto.put("nombre_producto", objetoProducto.getNombre_producto());
					unProducto.put("id_tipo_producto", objetoProducto.getTipoProducto().getId_tipo_producto());
					unProducto.put("nombre_tipo_producto", objetoProducto.getTipoProducto().getNombre_tipo_producto());
					unProducto.put("comentario_tipo_producto", objetoProducto.getTipoProducto().getComentario());
					listProductosEnUnPedido.put(unProducto);
				}
				unPedido.put("productos_del_pedido" , listProductosEnUnPedido);
				
				arrayResp.put(unPedido);
			}
			objetoResp.put("pedidos", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener pedidos \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}
	
	
	public String modificarInstanciaPedido(Map<String, Object> modificarInstanciaPedido) throws ParseException {
		String resp = "";
		try {
			int id_pedido = Integer.parseInt(modificarInstanciaPedido.get("id_pedido").toString());
			int id_estado_instancia = Integer.parseInt(modificarInstanciaPedido.get("id_estado_instancia").toString());
			
			resp = pedidoRepository.modificarInstanciaPedido(id_pedido, id_estado_instancia);
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al modificar instancia de pedido \n"
					+ "Mensaje: "+ e.getMessage();
		}
		return resp;
	}
	
	@Override
	public String obtenerPedidosEnPreparacion() {
		
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		JSONArray arrayResp = new JSONArray();
		try {
			
			List<Pedido> listPedido = pedidoRepository.obtenerPedidosEnPreparacion();
			
			for (Pedido pedido : listPedido) {
				JSONObject unPedido = new JSONObject();	
				unPedido.put("id_pedido", pedido.getId_pedido());
				unPedido.put("id_cliente", pedido.getCliente().getRut_cliente());
				unPedido.put("id_mesa", pedido.getMesa().getId_mesa());
				unPedido.put("fecha_ingreso", pedido.getFecha_ingreso());
				unPedido.put("id_estado_instancia", pedido.getEstadoInstancia().getId_estado_instancia());
				unPedido.put("nombre_estado_instancia", pedido.getEstadoInstancia().getNombre_estado_instancia());
				unPedido.put("id_boleta", pedido.getBoleta().getId_boleta());
				unPedido.put("subtotal", pedido.getSubtotal());
				
				JSONArray listPlatosEnUnPedido = new JSONArray();
				List<PlatosPedido> platosEnUnPedido = platosPedidoRepository.obtenerPlatosPorIdPedido(pedido.getId_pedido());
				for (PlatosPedido unPlatoEnUnPedido : platosEnUnPedido) {
					JSONObject unPlato = new JSONObject();
					Plato objetoPlato = platoRepository.getById(unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("id_plato", unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("cantidad_platos_en_pedido", unPlatoEnUnPedido.getCantidad_platos());
					
					unPlato.put("cantidad_personas_recomendadas", objetoPlato.getCantidad_personas_recomendadas());
					unPlato.put("precio_plato", objetoPlato.getPrecio_plato());
					unPlato.put("comentario_plato", objetoPlato.getComentario());
					unPlato.put("descripcion_plato", objetoPlato.getDescripcion_plato());
					unPlato.put("disponibilidad_plato", objetoPlato.isDisponibilidad());
					unPlato.put("nombre_plato", objetoPlato.getNombre_plato());
					unPlato.put("id_tipo_plato", objetoPlato.getTipo_plato().getId_tipo_plato());
					unPlato.put("nombre_tipo_plato", objetoPlato.getTipo_plato().getNombre_tipo_plato());
					unPlato.put("descripcion_tipo_plato", objetoPlato.getTipo_plato().getDescripcion());					
					listPlatosEnUnPedido.put(unPlato);
				}
				unPedido.put("platos_del_pedido" , listPlatosEnUnPedido);
				
				JSONArray listProductosEnUnPedido = new JSONArray();
				List<ProductosPedido> productosEnUnPedido = productosPedidoRepository.obtenerProductosPorIdPedido(pedido.getId_pedido());
				for (ProductosPedido unProductoEnUnPedido : productosEnUnPedido) {
					JSONObject unProducto = new JSONObject();
					Producto objetoProducto = productoRepository.getById(unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("id_producto", unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("cantidad_productos_en_pedido", unProductoEnUnPedido.getCantidad_producto());
					
					unProducto.put("stock_producto", objetoProducto.getStock_producto());
					unProducto.put("valor_unitario_producto", objetoProducto.getValor_unitario());
					unProducto.put("comentario_producto", objetoProducto.getComentario());
					unProducto.put("fecha_ingreso_producto", objetoProducto.getFecha_ingreso_producto());
					unProducto.put("fecha_vencimiento_producto", objetoProducto.getFecha_vencimiento());
					unProducto.put("medida_producto", objetoProducto.getMedida_producto());
					unProducto.put("nombre_producto", objetoProducto.getNombre_producto());
					unProducto.put("id_tipo_producto", objetoProducto.getTipoProducto().getId_tipo_producto());
					unProducto.put("nombre_tipo_producto", objetoProducto.getTipoProducto().getNombre_tipo_producto());
					unProducto.put("comentario_tipo_producto", objetoProducto.getTipoProducto().getComentario());
					listProductosEnUnPedido.put(unProducto);
				}
				unPedido.put("productos_del_pedido" , listProductosEnUnPedido);
				
				arrayResp.put(unPedido);
			}
			objetoResp.put("pedidos", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener pedidos \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}
	
	@Override
	public String obtenerPedidosParaEntregar() {
		
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		JSONArray arrayResp = new JSONArray();
		try {
			
			List<Pedido> listPedido = pedidoRepository.obtenerPedidosParaEntregar();
			
			for (Pedido pedido : listPedido) {
				JSONObject unPedido = new JSONObject();	
				unPedido.put("id_pedido", pedido.getId_pedido());
				unPedido.put("id_cliente", pedido.getCliente().getRut_cliente());
				unPedido.put("id_mesa", pedido.getMesa().getId_mesa());
				unPedido.put("fecha_ingreso", pedido.getFecha_ingreso());
				unPedido.put("id_estado_instancia", pedido.getEstadoInstancia().getId_estado_instancia());
				unPedido.put("nombre_estado_instancia", pedido.getEstadoInstancia().getNombre_estado_instancia());
				unPedido.put("id_boleta", pedido.getBoleta().getId_boleta());
				unPedido.put("subtotal", pedido.getSubtotal());
				
				JSONArray listPlatosEnUnPedido = new JSONArray();
				List<PlatosPedido> platosEnUnPedido = platosPedidoRepository.obtenerPlatosPorIdPedido(pedido.getId_pedido());
				for (PlatosPedido unPlatoEnUnPedido : platosEnUnPedido) {
					JSONObject unPlato = new JSONObject();
					Plato objetoPlato = platoRepository.getById(unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("id_plato", unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("cantidad_platos_en_pedido", unPlatoEnUnPedido.getCantidad_platos());
					
					unPlato.put("cantidad_personas_recomendadas", objetoPlato.getCantidad_personas_recomendadas());
					unPlato.put("precio_plato", objetoPlato.getPrecio_plato());
					unPlato.put("comentario_plato", objetoPlato.getComentario());
					unPlato.put("descripcion_plato", objetoPlato.getDescripcion_plato());
					unPlato.put("disponibilidad_plato", objetoPlato.isDisponibilidad());
					unPlato.put("nombre_plato", objetoPlato.getNombre_plato());
					unPlato.put("id_tipo_plato", objetoPlato.getTipo_plato().getId_tipo_plato());
					unPlato.put("nombre_tipo_plato", objetoPlato.getTipo_plato().getNombre_tipo_plato());
					unPlato.put("descripcion_tipo_plato", objetoPlato.getTipo_plato().getDescripcion());					
					listPlatosEnUnPedido.put(unPlato);
				}
				unPedido.put("platos_del_pedido" , listPlatosEnUnPedido);
				
				JSONArray listProductosEnUnPedido = new JSONArray();
				List<ProductosPedido> productosEnUnPedido = productosPedidoRepository.obtenerProductosPorIdPedido(pedido.getId_pedido());
				for (ProductosPedido unProductoEnUnPedido : productosEnUnPedido) {
					JSONObject unProducto = new JSONObject();
					Producto objetoProducto = productoRepository.getById(unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("id_producto", unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("cantidad_productos_en_pedido", unProductoEnUnPedido.getCantidad_producto());
					
					unProducto.put("stock_producto", objetoProducto.getStock_producto());
					unProducto.put("valor_unitario_producto", objetoProducto.getValor_unitario());
					unProducto.put("comentario_producto", objetoProducto.getComentario());
					unProducto.put("fecha_ingreso_producto", objetoProducto.getFecha_ingreso_producto());
					unProducto.put("fecha_vencimiento_producto", objetoProducto.getFecha_vencimiento());
					unProducto.put("medida_producto", objetoProducto.getMedida_producto());
					unProducto.put("nombre_producto", objetoProducto.getNombre_producto());
					unProducto.put("id_tipo_producto", objetoProducto.getTipoProducto().getId_tipo_producto());
					unProducto.put("nombre_tipo_producto", objetoProducto.getTipoProducto().getNombre_tipo_producto());
					unProducto.put("comentario_tipo_producto", objetoProducto.getTipoProducto().getComentario());
					listProductosEnUnPedido.put(unProducto);
				}
				unPedido.put("productos_del_pedido" , listProductosEnUnPedido);
				
				arrayResp.put(unPedido);
			}
			objetoResp.put("pedidos", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener pedidos \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}
	
	@Override
	public String obtenerPedidosEntregadosHoy() {
		
		String resp = "";
		JSONObject objetoResp = new JSONObject();
		JSONArray arrayResp = new JSONArray();
		try {
			
			List<Pedido> listPedido = pedidoRepository.obtenerPedidosEntregadosHoy();
			
			for (Pedido pedido : listPedido) {
				JSONObject unPedido = new JSONObject();	
				unPedido.put("id_pedido", pedido.getId_pedido());
				unPedido.put("id_cliente", pedido.getCliente().getRut_cliente());
				unPedido.put("id_mesa", pedido.getMesa().getId_mesa());
				unPedido.put("fecha_ingreso", pedido.getFecha_ingreso());
				unPedido.put("id_estado_instancia", pedido.getEstadoInstancia().getId_estado_instancia());
				unPedido.put("nombre_estado_instancia", pedido.getEstadoInstancia().getNombre_estado_instancia());
				unPedido.put("id_boleta", pedido.getBoleta().getId_boleta());
				unPedido.put("subtotal", pedido.getSubtotal());
				
				JSONArray listPlatosEnUnPedido = new JSONArray();
				List<PlatosPedido> platosEnUnPedido = platosPedidoRepository.obtenerPlatosPorIdPedido(pedido.getId_pedido());
				for (PlatosPedido unPlatoEnUnPedido : platosEnUnPedido) {
					JSONObject unPlato = new JSONObject();
					Plato objetoPlato = platoRepository.getById(unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("id_plato", unPlatoEnUnPedido.getPlatosPedidoId().getId_plato());
					unPlato.put("cantidad_platos_en_pedido", unPlatoEnUnPedido.getCantidad_platos());
					
					unPlato.put("cantidad_personas_recomendadas", objetoPlato.getCantidad_personas_recomendadas());
					unPlato.put("precio_plato", objetoPlato.getPrecio_plato());
					unPlato.put("comentario_plato", objetoPlato.getComentario());
					unPlato.put("descripcion_plato", objetoPlato.getDescripcion_plato());
					unPlato.put("disponibilidad_plato", objetoPlato.isDisponibilidad());
					unPlato.put("nombre_plato", objetoPlato.getNombre_plato());
					unPlato.put("id_tipo_plato", objetoPlato.getTipo_plato().getId_tipo_plato());
					unPlato.put("nombre_tipo_plato", objetoPlato.getTipo_plato().getNombre_tipo_plato());
					unPlato.put("descripcion_tipo_plato", objetoPlato.getTipo_plato().getDescripcion());					
					listPlatosEnUnPedido.put(unPlato);
				}
				unPedido.put("platos_del_pedido" , listPlatosEnUnPedido);
				
				JSONArray listProductosEnUnPedido = new JSONArray();
				List<ProductosPedido> productosEnUnPedido = productosPedidoRepository.obtenerProductosPorIdPedido(pedido.getId_pedido());
				for (ProductosPedido unProductoEnUnPedido : productosEnUnPedido) {
					JSONObject unProducto = new JSONObject();
					Producto objetoProducto = productoRepository.getById(unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("id_producto", unProductoEnUnPedido.getProductosPedidoId().getId_producto());
					unProducto.put("cantidad_productos_en_pedido", unProductoEnUnPedido.getCantidad_producto());
					
					unProducto.put("stock_producto", objetoProducto.getStock_producto());
					unProducto.put("valor_unitario_producto", objetoProducto.getValor_unitario());
					unProducto.put("comentario_producto", objetoProducto.getComentario());
					unProducto.put("fecha_ingreso_producto", objetoProducto.getFecha_ingreso_producto());
					unProducto.put("fecha_vencimiento_producto", objetoProducto.getFecha_vencimiento());
					unProducto.put("medida_producto", objetoProducto.getMedida_producto());
					unProducto.put("nombre_producto", objetoProducto.getNombre_producto());
					unProducto.put("id_tipo_producto", objetoProducto.getTipoProducto().getId_tipo_producto());
					unProducto.put("nombre_tipo_producto", objetoProducto.getTipoProducto().getNombre_tipo_producto());
					unProducto.put("comentario_tipo_producto", objetoProducto.getTipoProducto().getComentario());
					listProductosEnUnPedido.put(unProducto);
				}
				unPedido.put("productos_del_pedido" , listProductosEnUnPedido);
				
				arrayResp.put(unPedido);
			}
			objetoResp.put("pedidos", arrayResp);
			resp = objetoResp.toString();
			
		} catch (Exception e) {
			// TODO: handle exception
			resp = "Error al obtener pedidos \n"
					+ "Mensaje: "+ e.getMessage();
		}
		
		
		
		return resp;
	}

}
