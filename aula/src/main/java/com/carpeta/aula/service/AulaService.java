package com.carpeta.aula.service;

import com.carpeta.aula.model.*;
import com.carpeta.aula.repo.AlumnoRepository;
import com.carpeta.aula.repo.AulaRepository;
import com.carpeta.aula.repo.CursoRepository;
import com.carpeta.aula.repo.ProfesorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AulaService {

    @Autowired
    private AulaRepository aulaRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;


    public Aula crearAula(Aula aula, Integer idProfesor, Integer idCurso, List<Integer> idsAlumnos) {
        Profesor profesor = profesorRepository.findById(idProfesor)
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));
        Curso curso = cursoRepository.findById(idCurso)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        aula.setProfesor(profesor);
        aula.setCurso(curso);

        List<Alumno> alumnos = alumnoRepository.findAllById(idsAlumnos);
        aula.setAlumnos(alumnos);

        // Asegura que los días tengan referencia al aula
        if (aula.getDias() != null) {
            aula.getDias().forEach(d -> d.setAula(aula));
        }

        return aulaRepository.save(aula);
    }


    public List<Aula> listarAulas() {
        return aulaRepository.findAll();
    }


    @Transactional
    public void eliminarAula(Integer id) {
        if (!aulaRepository.existsById(id)) {
            throw new RuntimeException("El aula no existe");
        }
        aulaRepository.deleteById(id);
    }


    public Aula actualizarAula(Integer id, Aula nuevosDatos, Integer idProfesor, Integer idCurso, List<Integer> idsAlumnos) {
        Aula aulaExistente = aulaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aula no encontrada"));

        Profesor profesor = profesorRepository.findById(idProfesor)
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));
        Curso curso = cursoRepository.findById(idCurso)
                .orElseThrow(() -> new RuntimeException("Curso no encontrado"));

        aulaExistente.setProfesor(profesor);
        aulaExistente.setCurso(curso);

        // Actualizar alumnos
        List<Alumno> alumnos = alumnoRepository.findAllById(idsAlumnos);
        aulaExistente.getAlumnos().clear();
        aulaExistente.getAlumnos().addAll(alumnos);

        // Limpiar los días previos y agregar los nuevos
        aulaExistente.getDias().clear();

        if (nuevosDatos.getDias() != null) {
            for (AulaDia d : nuevosDatos.getDias()) {
                d.setId(null);
                d.setAula(aulaExistente);
                aulaExistente.getDias().add(d);
            }
        }

        return aulaRepository.save(aulaExistente);
    }



    public Aula obtenerAulaPorId(Integer id) {
        return aulaRepository.findById(id)
                .orElse(null);
    }


}
