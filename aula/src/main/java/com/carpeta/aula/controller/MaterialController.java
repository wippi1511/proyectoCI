package com.carpeta.aula.controller;

import com.carpeta.aula.model.MaterialApoyo;
import com.carpeta.aula.model.MaterialApoyo.Estado;
import com.carpeta.aula.service.MaterialService;
import com.carpeta.aula.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/materiales")
@CrossOrigin(origins = "*")
public class MaterialController {

    @Autowired
    private MaterialService service;

    @Autowired
    private FileStorageService storage;

    // 🟩 1. Listar materiales por curso
    @GetMapping("/curso/{idcurso}")
    public List<MaterialApoyo> listarPorCurso(@PathVariable Integer idcurso) {
        return service.listarPorCurso(idcurso);
    }

    // 🟩 2. Listar materiales pendientes (para revisión)
    @GetMapping("/pendientes")
    public List<MaterialApoyo> listarPendientes() {
        return service.listarPendientes();
    }

    // 🟩 3. Subir un nuevo material
    @PostMapping(value="/upload", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public MaterialApoyo subirMaterial(@RequestParam("file") MultipartFile file,
                                       @RequestParam("idcurso") Integer idcurso,
                                       @RequestParam("idprofesor") Integer idprofesor) {
        return service.subirMaterial(file, idcurso, idprofesor);
    }

    // 🟩 4. Actualizar estado del material (para revisión)
    @PutMapping("/{id}/estado")
    public MaterialApoyo actualizarEstado(@PathVariable Integer id,
                                          @RequestParam("estado") String estado) {
        Estado nuevoEstado = Estado.valueOf(estado);
        return service.actualizarEstado(id, nuevoEstado);
    }

    // 🟩 5. Descargar material
    @GetMapping("/download")
    public ResponseEntity<Resource> descargarArchivo(@RequestParam("path") String path) {
        Resource recurso = storage.load(path);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + recurso.getFilename() + "\"")
                .body(recurso);
    }
}
