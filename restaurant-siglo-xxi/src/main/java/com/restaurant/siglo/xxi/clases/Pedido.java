package com.restaurant.siglo.xxi.clases;

import java.sql.Date;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table (name="pedido")
@NamedQueries(
		{
			@NamedQuery(
					name = "obtenerPedidosPorIdBoleta", 
					query = " select p from Pedido p where p.boleta.id_boleta = :id_boleta order by 2 asc "
			),
			@NamedQuery(
					name = "obtenerPedidosEnCola", 
					query = " select p from Pedido p where p.estadoInstancia.id_estado_instancia = 1 order by 2 asc "
			),
			@NamedQuery(
					name = "obtenerPedidosEnPreparacion", 
					query = " select p from Pedido p where p.estadoInstancia.id_estado_instancia = 2 order by 2 asc "
			),
			@NamedQuery(
					name = "obtenerPedidosParaEntregar", 
					query = " select p from Pedido p where p.estadoInstancia.id_estado_instancia = 3 order by 2 asc "
			),
			@NamedQuery(
					name = "obtenerPedidosEntregadosHoy", 
					query = " select p from Pedido p where p.estadoInstancia.id_estado_instancia = 4 order by 2 asc "
			),
			
		})
public class Pedido {
	@Id
	int id_pedido;
	
	@ManyToOne
	@JoinColumn(name = "id_cliente")
	private Cliente cliente;
	
	@ManyToOne
	@JoinColumn(name = "id_estado_instancia")
	private EstadoInstancia estadoInstancia;

	@ManyToOne
	@JoinColumn(name = "id_mesa")
	private Mesa mesa;
	
	@ManyToOne
	@JoinColumn(name = "id_boleta")
	private Boleta boleta;
	
	Timestamp fecha_ingreso;
	
	private int subtotal;

	public int getId_pedido() {
		return id_pedido;
	}

	public void setId_pedido(int id_pedido) {
		this.id_pedido = id_pedido;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public EstadoInstancia getEstadoInstancia() {
		return estadoInstancia;
	}

	public void setEstadoInstancia(EstadoInstancia estadoInstancia) {
		this.estadoInstancia = estadoInstancia;
	}

	public Mesa getMesa() {
		return mesa;
	}

	public void setMesa(Mesa mesa) {
		this.mesa = mesa;
	}

	public Timestamp getFecha_ingreso() {
		return fecha_ingreso;
	}

	public void setFecha_ingreso(Timestamp fecha_ingreso) {
		this.fecha_ingreso = fecha_ingreso;
	}

	public Boleta getBoleta() {
		return boleta;
	}

	public void setBoleta(Boleta boleta) {
		this.boleta = boleta;
	}

	public int getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(int subtotal) {
		this.subtotal = subtotal;
	}	
}
