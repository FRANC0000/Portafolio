package com.restaurant.siglo.xxi.controller;

import java.io.File;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class fileUploadController {
	
	@PostMapping("/upload")
	public ResponseEntity<?> handleFileUpload( @RequestParam ("file") MultipartFile file){
		try {
			file.transferTo(new File ("C:\\Desktop\\Portafolio\\Restaurant-SXXI\\src\\assets\\img-platos\\"+file.getOriginalFilename()));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
		
		return ResponseEntity.ok("Proceso cargado.");
	}

}
