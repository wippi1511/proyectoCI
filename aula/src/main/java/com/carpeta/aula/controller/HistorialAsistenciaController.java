package com.carpeta.aula.controller;

import com.carpeta.aula.model.HistorialAsistencia;
import com.carpeta.aula.service.HistorialAsistenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/asistencias/historial")
@CrossOrigin("*")
public class HistorialAsistenciaController {

    @Autowired
    private HistorialAsistenciaService service;

    @GetMapping
    public List<HistorialAsistencia> filtrar(
            @RequestParam(required = false) Integer idAula,
            @RequestParam(required = false) Integer idAlumno,
            @RequestParam(required = false) String inicio,
            @RequestParam(required = false) String fin
    ) {
        LocalDate fechaInicio = (inicio != null) ? LocalDate.parse(inicio) : null;
        LocalDate fechaFin = (fin != null) ? LocalDate.parse(fin) : null;

        return service.filtrar(idAula, idAlumno, fechaInicio, fechaFin);
    }
}
