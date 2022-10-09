--EJECUTAR POR BLOQUE
--Tipos de mesa
insert into tipo_mesa (id_tipo_mesa, cantidad_asientos, nombre_tipo_mesa)
values ( 1, 2, 'Dupla');
insert into tipo_mesa (id_tipo_mesa, cantidad_asientos, nombre_tipo_mesa)
values ( 2, 4, 'Amigos');
insert into tipo_mesa (id_tipo_mesa, cantidad_asientos, nombre_tipo_mesa)
values ( 3, 8, 'Familiar');
insert into tipo_mesa (id_tipo_mesa, cantidad_asientos, nombre_tipo_mesa)
values ( 4, 12, 'Especial');

--Estados de las mesas
insert into estado_mesa (id_estado_mesa, nombre_estado_mesa)
values ( 1, 'Disponible');
insert into estado_mesa (id_estado_mesa, nombre_estado_mesa)
values ( 2, 'Ocupado');
insert into estado_mesa (id_estado_mesa, nombre_estado_mesa)
values ( 3, 'Limpieza');

--Mesas
--duplas(4)
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 1, 1, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 2, 1, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 3, 1, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 4, 1, 1);
--amigos(8)
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 5, 2, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 6, 2, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 7, 2, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 8, 2, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 9, 2, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 10, 2, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 11, 2, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 12, 2, 1);
--amigos XL(6)
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 13, 3, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 14, 3, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 15, 3, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 16, 3, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 17, 3, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 18, 3, 1);
--Especial(2)
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 19, 4, 1);
insert into mesa (id_mesa, id_tipo_mesa, id_estado_mesa)
values ( 20, 4, 1);