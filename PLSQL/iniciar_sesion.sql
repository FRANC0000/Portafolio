CREATE OR REPLACE FUNCTION iniciar_sesion(idUsuario varchar,contrasena varchar) 
RETURNS varchar AS
$BODY$
DECLARE
	v_idUsuario varchar = idUsuario;
	v_contrasena varchar = contrasena;
	resp usuario%rowtype;
	
BEGIN
	-- select * from
	select * into resp from usuario u where u.id_usuario = v_idUsuario and u.contrasena = v_contrasena;

	if not found then
		RETURN 'Credenciales incorrectas';
	else
		RETURN 'Accediendo al sistema correctamente';
	end if;
END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100


--select * from usuario u where u.id_usuario = 'frankete' and u.contrasena = '1234'
select iniciar_sesion('frankete','1234')