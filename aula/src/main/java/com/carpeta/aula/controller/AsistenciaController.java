package com.carpeta.aula.controller;

import com.carpeta.aula.model.Alumno;
import com.carpeta.aula.model.Asistencia;
import com.carpeta.aula.service.AsistenciaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/asistencias")
@CrossOrigin(origins = "*")
public class AsistenciaController {

    private final AsistenciaService asistenciaService;

    public AsistenciaController(AsistenciaService asistenciaService) {
        this.asistenciaService = asistenciaService;
    }

    @PostMapping
    public Asistencia registrarAsistencia(@RequestBody Map<String, Object> datos) {
        Integer idAula = (Integer) datos.get("idAula");
        Integer idAlumno = (Integer) datos.get("idAlumno");
        String fechaStr = (String) datos.get("fecha");
        String estadoStr = (String) datos.get("estado");
        String observacion = (String) datos.getOrDefault("observacion", "");

        LocalDate fecha = LocalDate.parse(fechaStr);
        Asistencia.EstadoAsistencia estado = Asistencia.EstadoAsistencia.valueOf(estadoStr);

        return asistenciaService.registrarAsistencia(idAula, idAlumno, fecha, estado, observacion);
    }

    @GetMapping("/aula/{idAula}")
    public List<Asistencia> obtenerAsistenciasPorAulaYFecha(
            @PathVariable Integer idAula,
            @RequestParam(required = false) String fecha) {

        if (fecha != null) {
            LocalDate fechaConsulta = LocalDate.parse(fecha);
            return asistenciaService.obtenerAsistenciasPorAulaYFecha(idAula, fechaConsulta);
        } else {
            return asistenciaService.obtenerAsistenciasPorAula(idAula);
        }
    }

    @GetMapping("/aula/{idAula}/alumnos")
    public List<Alumno> obtenerAlumnosDeAula(@PathVariable Integer idAula) {
        return asistenciaService.obtenerAlumnosPorAula(idAula);
    }



}

