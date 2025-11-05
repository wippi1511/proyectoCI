package com.carpeta.aula.controller;

import com.carpeta.aula.model.Curso;
import com.carpeta.aula.repo.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "*")
public class CursoController {

    @Autowired
    private CursoRepository cursoRepository;

    @GetMapping("/activos")
    public List<Curso> obtenerCursosActivos() {
        return cursoRepository.findByEstado("Activo");
    }
}
