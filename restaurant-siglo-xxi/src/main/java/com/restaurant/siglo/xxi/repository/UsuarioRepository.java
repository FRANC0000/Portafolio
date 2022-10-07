package com.restaurant.siglo.xxi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.restaurant.siglo.xxi.clases.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, String>{
	
	@Query(value = "select crear_usuario(:id_usuario, :nombre, :apP, :apM, :rut, :rol, :correo, :contrasena) ", nativeQuery = true)
	String crearUsuario(@Param("id_usuario") String id_usuario, 
			@Param("nombre") String nombre,
			@Param("apP") String apP,
			@Param("apM") String apM,
			@Param("rut") String rut,
			@Param("rol") String rol,
			@Param("correo") String correo,
			@Param("contrasena") String contrasena);
	
	@Query(value = "select iniciar_sesion(:id_usuario,:contrasena) ", nativeQuery = true)
	String iniciarSesion(@Param("id_usuario") String id_usuario,@Param("contrasena") String contrasena);
	
	
	@Query(value = "select modificar_usuario(:id_usuario, :nombre, :apellido_paterno, :apellido_materno, :rut, :rol, :correo, :contrasena) ", nativeQuery = true)
    String modificarUsuario(@Param("id_usuario") String id_usuario,
            @Param("nombre") String nombre,
            @Param("apellido_paterno") String apellido_paterno,
            @Param("apellido_materno") String apellido_materno,
            @Param("rut") String rut,
            @Param("rol") String rol,
            @Param("correo") String correo,
            @Param("contrasena") String contrasena);
            
}
