package com.carpeta.aula.controller;

import com.carpeta.aula.model.Profesor;
import com.carpeta.aula.repo.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "*")
public class ProfesorController {

    @Autowired
    private ProfesorRepository profesorRepository;

    @GetMapping("/activos")
    public List<Profesor> obtenerProfesoresActivos() {
        return profesorRepository.findProfesoresActivos();
    }
}
