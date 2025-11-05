package com.carpeta.aula.controller;

import com.carpeta.aula.model.Historial;
import com.carpeta.aula.repo.HistorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/historial")
@CrossOrigin(origins = "*")
public class HistorialController {

    @Autowired
    private HistorialRepository historialRepository;

    @GetMapping
    public List<Historial> listarHistorial() {
        return historialRepository.findAll(Sort.by(Sort.Direction.DESC, "fechaOperacion"));
    }
}

