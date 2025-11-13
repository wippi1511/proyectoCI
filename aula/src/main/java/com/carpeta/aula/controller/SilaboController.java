package com.carpeta.aula.controller;

import com.carpeta.aula.model.Silabo;
import com.carpeta.aula.service.SilaboService;
import com.carpeta.aula.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/silabos")
@CrossOrigin(origins = "*")
public class SilaboController {

    @Autowired private SilaboService service;
    @Autowired private FileStorageService storage;

    @GetMapping("/curso/{idcurso}")
    public List<Silabo> listar(@PathVariable Integer idcurso) {
        return service.listarPorCurso(idcurso);
    }

    @PostMapping(value="/upload", consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
    public Silabo subir(@RequestParam("file") MultipartFile file,
                        @RequestParam("idcurso") Integer idcurso,
                        @RequestParam("idprofesor") Integer idprofesor) {
        return service.subirSilabo(file, idcurso, idprofesor);
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> descargar(@RequestParam String path) {
        Resource file = storage.load(path);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
