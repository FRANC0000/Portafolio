package com.restaurant.siglo.xxi.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.restaurant.siglo.xxi.clases.FileUploadUtil;
import com.restaurant.siglo.xxi.repository.PlatoRepository;
import com.restaurant.siglo.xxi.repository.ProductoRepository;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;

@RestController
public class SubirImagenController {
	@Autowired
	PlatoRepository	platoRepository;
	
	@Autowired
	ProductoRepository	productoRepository;
	
	@GetMapping("imagenes-rxxi/platos/{filename}")
    public ResponseEntity<byte[]> getImagePlato(@PathVariable("filename") String filename) {
        byte[] image = new byte[0];
        try {
            image = FileUtils.readFileToByteArray(new File("imagenes-rxxi/platos/" + filename));
        } catch (IOException e) {
        	System.out.println("Error: No se pudo leer la imagen: imagenes-rxxi/platos/"+ filename);
            //e.printStackTrace();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }
    
    @GetMapping("imagenes-rxxi/productos/{filename}")
    public ResponseEntity<byte[]> getImageProducto(@PathVariable("filename") String filename) {
        byte[] image = new byte[0];
        try {
            image = FileUtils.readFileToByteArray(new File("imagenes-rxxi/productos/" + filename));
        } catch (IOException e) {
        	System.out.println("Error: No se pudo leer la imagen: imagenes-rxxi/productos/"+ filename);
            //e.printStackTrace();
        }
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    @GetMapping("imagenes-rxxi/reportes/{filename}")
    public ResponseEntity<byte[]> getReporte(@PathVariable("filename") String filename) {
        byte[] image = new byte[0];
        try {
            image = FileUtils.readFileToByteArray(new File("imagenes-rxxi/reportes/" + filename));
        } catch (IOException e) {
        	System.out.println("Error: No se pudo leer el pdf: imagenes-rxxi/reportes/"+ filename);
            //e.printStackTrace();
        }
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(image);
    }
     
    @PostMapping("/plato/save")
    public void saveImgPlato(@RequestParam("fichero") MultipartFile multipartFile, @RequestParam("id_plato") int id_plato) throws IOException {
    	
    	try {
    		//Obtenemos el nombre del fichero
        	String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename()).toLowerCase();
            String fileName = id_plato + "." + extension;
            //Establecemos el directorio donde se subiran nuestros ficheros  
            String uploadDir = "imagenes-rxxi\\platos";
             
            //Guardamos la imagen
            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
            platoRepository.agregarNombreImagenPorIdPlato(id_plato, fileName);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR en saveImgPlato: "+ e);
		}
    }
    
    @PostMapping("/producto/save")
    public void saveImgProducto(@RequestParam("fichero") MultipartFile multipartFile, @RequestParam("id_producto") int id_producto) throws IOException {
    	try {
    		//Obtenemos el nombre del fichero
    		String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename()).toLowerCase();
            String fileName = id_producto + "." + extension;
            //Establecemos el directorio donde se subiran nuestros ficheros  
            String uploadDir = "imagenes-rxxi\\productos";
             
            //Guardamos la imagen
            FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
            productoRepository.agregarNombreImagenPorIdProducto(id_producto, fileName);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println("ERROR en saveImgProducto: "+ e);
		}
        
    }
    @PostMapping("/reportes/save")
    public void guardarPdfReportes(@RequestParam("fichero") MultipartFile multipartFile, @RequestParam("nombre") String nombre) throws IOException {
    	try {
    		//Obtenemos el nombre del fichero
    		String fileName = nombre;
    		//Establecemos el directorio donde se subiran nuestros ficheros  
    		String uploadDir = "imagenes-rxxi\\reportes";
    		
    		//Guardamos la imagen
    		FileUploadUtil.saveFile(uploadDir, fileName, multipartFile);
    	} catch (Exception e) {
    		// TODO: handle exception
    		System.out.println("ERROR en guardarPdfReportes: "+ e);
    	}
    	
    }
}
