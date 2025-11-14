
package com.carpeta.aula.controller;

import com.carpeta.aula.model.Profesor;
import com.carpeta.aula.service.ProfesorService;
import com.carpeta.aula.repo.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "*")
public class ProfesorController {

    @Autowired
    private ProfesorService profesorService;

    @Autowired
    private ProfesorRepository profesorRepository;

    // 🔹 Listar todos los profesores
    @GetMapping
    public List<Profesor> listarProfesores() {
        return profesorService.listarProfesores();
    }

    // 🔹 Obtener profesor por ID
    @GetMapping("/{id}")
    public ResponseEntity<Profesor> obtenerPorId(@PathVariable Integer id) {
        Profesor profesor = profesorService.obtenerPorId(id);
        return profesor != null ? ResponseEntity.ok(profesor) : ResponseEntity.notFound().build();
    }

    // 🔹 Crear profesor
    @PostMapping("/crear")
    public ResponseEntity<Profesor> crearProfesor(@RequestBody Profesor profesor) {
        Profesor nuevo = profesorService.crearProfesor(profesor);
        return ResponseEntity.ok(nuevo);
    }

    // 🔹 Actualizar profesor
    @PutMapping("/{id}")
    public ResponseEntity<Profesor> actualizarProfesor(@PathVariable Integer id, @RequestBody Profesor profesor) {
        Profesor actualizado = profesorService.actualizarProfesor(id, profesor);
        return actualizado != null ? ResponseEntity.ok(actualizado) : ResponseEntity.notFound().build();
    }

    // 🔹 Eliminar profesor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProfesor(@PathVariable Integer id) {
        profesorService.eliminarProfesor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/activos")
    public List<Profesor> obtenerProfesoresActivos() {
        return profesorRepository.findProfesoresActivos();
    }
}
