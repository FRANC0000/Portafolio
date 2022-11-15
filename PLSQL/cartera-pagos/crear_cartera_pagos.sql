CREATE OR REPLACE FUNCTION crear_cartera_pago(rut_cliente integer,
											nro_tarjeta varchar,
											mes_exp integer,
											anno_exp integer,
											cvv integer,
											email varchar,
											nombre_titular varchar,
											rut_titular varchar)
RETURNS varchar AS
$BODY$
DECLARE
	v_id_carterapago integer = nextval('seq_id_carterapago');
	v_rut_cliente integer = rut_cliente;
	v_nro_tarjeta varchar = nro_tarjeta;
	v_mes_exp integer = mes_exp;
	v_anno_exp integer = anno_exp;
	v_cvv integer = cvv;
	v_email varchar = email;
	v_nombre_titular varchar = nombre_titular;
	v_rut_titular varchar = rut_titular;	
BEGIN

  -- insert into
  insert into cartera_pagos (id_cartera_pagos,
						  	id_cliente,
							nro_tarjeta,
							mes_exp,
							anno_exp,
							cvv,
							email,
							nombre_titular,
							rut_titular)
					values (v_id_carterapago, v_rut_cliente, v_nro_tarjeta, v_mes_exp, v_anno_exp, v_cvv, v_email, v_nombre_titular, v_rut_titular);

  RETURN v_id_carterapago;

END;
$BODY$
LANGUAGE plpgsql VOLATILE COST 100

select crear_cartera_pago(20392004, '1111222233334444', 12, 22, 333, 'f.teran.p22@gmail.com', 'Franco Terán Peña', '20392004-0')