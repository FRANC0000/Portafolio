# Portafolio
# Restaurant SIGLO XXI

En la terminal situado de preferencia en el Escritorio: 
git clone https://github.com/FRANC0000/Portafolio
luego de clonar, git checkout desarrollo


Para correr este proyecto ese necesario:
1-Instalar Eclipse para backend (https://www.eclipse.org/downloads/)
2-Instalar Visual Studio Code para frontend (https://code.visualstudio.com/docs/?dv=win)
3-Instalar Postgresql para la base de datos (https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
4-Instalar Pgadmin4 para administrar la base de datos (https://www.pgadmin.org/download/)
5-Java JRE 17 para usarlo en ECLIPSE (https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
6-Instalar GIT (https://git-scm.com/downloads)

El proyecto para ECLIPSE tiene el nombre de 'restaurant-siglo-xxi'
El proyecto para VISUAL STUDIO CODE tiene el nombre de 'Restaurant-SXXI'

# PGADMIN
Para crear la base de datos en Pgadmin se debe instalar previamente postgresql. 
Luego click derecho en Servers>Register>Server
Añadir nombre>Moverse a pestaña 'Connection'>Host: localhost / Username: postgres / Password: admin
Dentro del servidor creado, se encuentra 'Databases'. 
Luego click derecho, create>database y ponerle el nombre 'restaurant-sxxi' y guardar.

# EJECUTAR FLUJO DE #ECLIPSE para continuar con lo de abajo.

Sobre la database creada, click derecho> 'Query Tool'. Dentro de la interfaz, abrir archivo PLSQL/crear_usuario.sql
y ejecutar desde CREATE OR REPLACE FUNCTION hasta LANGUAGE plpgsql VOLATILE COST 100;
Luego ejecutar la query 'select crear_usuario(...'
Luego ejecutar la consulta a la tabla usuario (esta se crea automaticamente al ejecutar el backend)

# ECLIPSE
En eclipse abrimos el proyecto 'restaurant-siglo-xxi' y verificar que no existan errores.
En caso de que existan errores: click derecho al proyecto> Build path > Configure build path.
Situarse en la pestaña libraries y ver la versión de JRE System Library (debe ser JavaSE-17)
Si no hay errores hay que instalar spring boot en la pestaña Help > Eclipse Marketplace > buscar: Spring Tools 4 e instalar.
Luego de instalar eclipse pide reiniciar para aplicar cambios.
Luego de reiniciar. Click derecho en el proyecto > Run As > Spring Boot App.
Al ejecutar, verificar que diga al final 'Started RestaurantSigloXxiApplication...'

# VISUAL STUDIO CODE
Por consola de git bash en Visual Studio Code, entrar a la carpeta 'Restaurant-SXXI'
Escribir comando 'npm install'
Luego usar comando 'npm start'
Abrir desde cmd (como administrador) Google Chrome sin seguridad con este comando:
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
Ir a la url: 'http://localhost:4200/'
A este punto el sistema debería correr estar corriendo 100%