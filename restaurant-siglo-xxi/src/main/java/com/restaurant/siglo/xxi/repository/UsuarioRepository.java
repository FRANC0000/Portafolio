package com.restaurant.siglo.xxi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{
	
	@Query(value = "select crear_usuario(:id_usuario, :nombre, :apP, :apM, :rut, :dv, :rol, :correo, :contrasena) ", nativeQuery = true)
	String crearUsuario(@Param("id_usuario") String id_usuario, 
			@Param("nombre") String nombre,
			@Param("apP") String apP,
			@Param("apM") String apM,
			@Param("rut") int rut,
			@Param("dv") String dv,
			@Param("rol") int rol,
			@Param("correo") String correo,
			@Param("contrasena") String contrasena);
	
	@Query(value = "select iniciar_sesion(:id_usuario,:contrasena) ", nativeQuery = true)
	String iniciarSesion(@Param("id_usuario") String id_usuario,@Param("contrasena") String contrasena);
	
}
