package com.carpeta.aula.controller;

import com.carpeta.aula.model.Aula;
import com.carpeta.aula.model.AulaDia;
import com.carpeta.aula.repo.AulaRepository;
import com.carpeta.aula.service.AulaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/aulas")
@CrossOrigin(origins = "*")
public class AulaController {

    @Autowired
    private AulaService aulaService;


    @PostMapping("/crear")
    public Aula crearAula(@RequestBody Map<String, Object> datos) {
        Integer idProfesor = (Integer) datos.get("idProfesor");
        Integer idCurso = (Integer) datos.get("idCurso");
        List<Integer> idsAlumnos = (List<Integer>) datos.get("idsAlumnos");

        List<Map<String, Object>> dias = (List<Map<String, Object>>) datos.get("dias");
        List<AulaDia> diasAula = new ArrayList<>();

        for (Map<String, Object> d : dias) {
            AulaDia dia = new AulaDia();
            dia.setDia(AulaDia.DiaSemana.valueOf((String) d.get("dia")));
            dia.setHoraInicio(LocalTime.parse((String) d.get("horaInicio")));
            dia.setHoraFin(LocalTime.parse((String) d.get("horaFin")));
            diasAula.add(dia);
        }

        Aula aula = new Aula();
        aula.setDias(diasAula);

        return aulaService.crearAula(aula, idProfesor, idCurso, idsAlumnos);
    }


    @GetMapping
    public List<Aula> listarAulas() {
        return aulaService.listarAulas();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarAula(@PathVariable Integer id) {
        aulaService.eliminarAula(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public Aula actualizarAula(@PathVariable Integer id, @RequestBody Map<String, Object> datos) {

        return procesarDatosAula(id, datos, false);
    }


    private Aula procesarDatosAula(Integer id, Map<String, Object> datos, boolean esNuevo) {
        // ✅ Manejar profesor y curso como objetos
        Map<String, Object> profesorMap = (Map<String, Object>) datos.get("profesor");
        Map<String, Object> cursoMap = (Map<String, Object>) datos.get("curso");

        Integer idProfesor = profesorMap != null ? (Integer) profesorMap.get("idprofesor") : null;
        Integer idCurso = cursoMap != null ? (Integer) cursoMap.get("idcurso") : null;

        List<Integer> idsAlumnos = (List<Integer>) datos.get("idsAlumnos");
        List<Map<String, Object>> dias = (List<Map<String, Object>>) datos.get("dias");

        List<AulaDia> diasAula = new ArrayList<>();
        if (dias != null) {
            for (Map<String, Object> d : dias) {
                AulaDia dia = new AulaDia();
                dia.setDia(AulaDia.DiaSemana.valueOf((String) d.get("dia")));
                dia.setHoraInicio(LocalTime.parse((String) d.get("horaInicio")));
                dia.setHoraFin(LocalTime.parse((String) d.get("horaFin")));
                diasAula.add(dia);
            }
        }

        Aula aula = new Aula();
        aula.setDias(diasAula);

        if (esNuevo)
            return aulaService.crearAula(aula, idProfesor, idCurso, idsAlumnos);
        else
            return aulaService.actualizarAula(id, aula, idProfesor, idCurso, idsAlumnos);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Aula> obtenerAulaPorId(@PathVariable Integer id) {
        Aula aula = aulaService.obtenerAulaPorId(id);
        if (aula == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(aula);
    }

}