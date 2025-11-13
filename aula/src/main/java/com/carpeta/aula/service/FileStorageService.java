package com.carpeta.aula.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;

@Service
public class FileStorageService {

    private final Path storagePath;

    public FileStorageService(@Value("${app.file.storage-location}") String storageDir) {
        this.storagePath = Paths.get(storageDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.storagePath);
        } catch (IOException ex) {
            throw new RuntimeException("No se pudo crear el directorio de almacenamiento", ex);
        }
    }

    public String store(MultipartFile file) {
        String filename = System.currentTimeMillis() + "_" + StringUtils.cleanPath(file.getOriginalFilename());
        try {
            Path target = this.storagePath.resolve(filename);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
            return target.toString();
        } catch (IOException ex) {
            throw new RuntimeException("Error guardando archivo " + filename, ex);
        }
    }

    public Resource load(String path) {
        try {
            Path filePath = Paths.get(path);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) return resource;
            else throw new RuntimeException("Archivo no encontrado: " + path);
        } catch (MalformedURLException ex) {
            throw new RuntimeException("Error al cargar archivo: " + path, ex);
        }
    }
}
