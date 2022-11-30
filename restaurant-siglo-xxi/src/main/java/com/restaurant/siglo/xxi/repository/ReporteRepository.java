package com.restaurant.siglo.xxi.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Reporte;

public interface ReporteRepository extends JpaRepository<Reporte, Integer>{
	
	@Query(value = "SELECT * FROM  vista_reporte_pedido", nativeQuery = true)
	List<String> obtenerReporteProducto();
	
	@Query(value = "SELECT * FROM  vista_reporte_stock", nativeQuery = true)
	List<String> obtenerReporteStock();
	
	@Query(value = "select * from vista_clientes_atendidos_mes_actual", nativeQuery = true)
	List<String> obtenerReporteClientesAtendidosMesActual();
	
	@Query(value = "select * from vista_cliente_atendido_por_boleta_mes_actual", nativeQuery = true)
	List<String> obtenerReporteClientesAtendidosPorBoletaMesActual();

	@Query(value = "select * from vista_cant_ingresos_por_cliente_mes_actual", nativeQuery = true)
	List<String> obtenerReporteCantIngresosPorClientesMesActual();
	
	@Query(value = "select * from vista_platos_consumidos", nativeQuery = true)
	List<String> obtenerReporteVistaPlatosConsumidos();
	
	@Query(value = "select * from vista_reporte_reabastecimiento", nativeQuery = true)
	List<String> obtenerReporteReabastecimiento();
	
	@Query(value = "select crear_reporte(:comentario, :extension, :fecha_creacion, :nombre_creacion, :titulo_reporte, :id_tipo_reporte, :id_usuario) ", nativeQuery = true)
	String crearReporte
			(@Param("comentario") String comentario,
			@Param("extension") String extension,
			@Param("fecha_creacion") Timestamp fecha_creacion,
			@Param("nombre_creacion") String nombre_creacion,
			@Param("titulo_reporte") String titulo_reporte,
			@Param("id_tipo_reporte") int id_tipo_reporte,
			@Param("id_usuario") String id_usuario);
	
	@Query(value = "select eliminar_reporte(:id_reporte)", nativeQuery = true)
    String eliminarReporte(@Param("id_reporte") int id_reporte);
	
	@Query(value = "select modificar_reporte(:id_reporte, :comentario, :extension, :fecha_creacion, :nombre_creacion, :titulo_reporte, :id_tipo_reporte, :id_usuario)", nativeQuery = true)
	String modificarReporte
			(@Param("id_reporte") int id_reporte,
			@Param("comentario") String comentario,
			@Param("extension") String extension,
			@Param("fecha_creacion") Timestamp fecha_creacion,
			@Param("nombre_creacion") String nombre_creacion,
			@Param("titulo_reporte") String titulo_reporte,
			@Param("id_tipo_reporte") int id_tipo_reporte,
			@Param("id_usuario") String id_usuario);
	
	@Query(value = "select * from vista_rendimiento_financiero_30m", nativeQuery = true)
	List<String> obtenerReporteFinanciero30m();
	
	@Query(value = "select * from vista_rendimiento_financiero_40m", nativeQuery = true)
	List<String> obtenerReporteFinanciero40m();

	@Query(value = "select * from vista_rendimiento_financiero_50m", nativeQuery = true)
	List<String> obtenerReporteFinanciero50m();
	
	@Query(value = "select * from vista_duracion_promedio_estadia_mensual", nativeQuery = true)
	List<String> obtenerReporteTiempoAtencionPromedio();

	@Query(value = "select * from vista_duracion_estadia_mensual_por_boleta", nativeQuery = true)
	List<String> obtenerReporteTiempoDuracionEstadiaMensual();
}
