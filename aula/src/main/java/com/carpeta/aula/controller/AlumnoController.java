package com.carpeta.aula.controller;

import com.carpeta.aula.model.Alumno;
import com.carpeta.aula.repo.AlumnoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoRepository alumnoRepository;


    @GetMapping
    public List<Alumno> listar() {
        return alumnoRepository.findAll();
    }


    @GetMapping("/activos")
    public List<Alumno> listarActivos() {
        return alumnoRepository.findByEstado("Activo");
    }


    @GetMapping("/{id}")
    public Alumno obtenerPorId(@PathVariable Integer id) {
        return alumnoRepository.findById(id).orElse(null);
    }


    @PostMapping
    public Alumno crear(@RequestBody Alumno alumno) {
        alumno.setEstado("Activo");
        return alumnoRepository.save(alumno);
    }


    @PutMapping("/{id}")
    public Alumno actualizar(@PathVariable Integer id, @RequestBody Alumno alumnoDetalles) {
        return alumnoRepository.findById(id).map(alumno -> {
            alumno.setNombres(alumnoDetalles.getNombres());
            alumno.setApellidos(alumnoDetalles.getApellidos());
            alumno.setEstado(alumnoDetalles.getEstado());
            return alumnoRepository.save(alumno);
        }).orElse(null);
    }


    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        alumnoRepository.deleteById(id);
    }
}
