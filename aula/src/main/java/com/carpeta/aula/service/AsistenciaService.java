package com.carpeta.aula.service;

import com.carpeta.aula.model.Asistencia;
import com.carpeta.aula.model.Aula;
import com.carpeta.aula.model.Alumno;
import com.carpeta.aula.repo.AsistenciaRepository;
import com.carpeta.aula.repo.AulaRepository;
import com.carpeta.aula.repo.AlumnoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AsistenciaService {

    private final AsistenciaRepository asistenciaRepository;
    private final AulaRepository aulaRepository;
    private final AlumnoRepository alumnoRepository;

    public AsistenciaService(AsistenciaRepository asistenciaRepository,
                             AulaRepository aulaRepository,
                             AlumnoRepository alumnoRepository) {
        this.asistenciaRepository = asistenciaRepository;
        this.aulaRepository = aulaRepository;
        this.alumnoRepository = alumnoRepository;
    }

    // ✅ Registrar o actualizar asistencia
    public Asistencia registrarAsistencia(Integer idAula, Integer idAlumno, LocalDate fecha,
                                          Asistencia.EstadoAsistencia estado, String observacion) {
        Aula aula = aulaRepository.findById(idAula)
                .orElseThrow(() -> new RuntimeException("Aula no encontrada con ID: " + idAula));

        Alumno alumno = alumnoRepository.findById(idAlumno)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado con ID: " + idAlumno));

        Optional<Asistencia> asistenciaExistente =
                asistenciaRepository.findByAula_IdAndAlumno_IdalumnoAndFecha(idAula, idAlumno, fecha);

        Asistencia asistencia = asistenciaExistente.orElseGet(Asistencia::new);
        asistencia.setAula(aula);
        asistencia.setAlumno(alumno);
        asistencia.setFecha(fecha);
        asistencia.setEstado(estado);
        asistencia.setObservacion(observacion);

        return asistenciaRepository.save(asistencia);
    }

    // ✅ Obtener asistencias por aula y fecha
    public List<Asistencia> obtenerAsistenciasPorAulaYFecha(Integer idAula, LocalDate fecha) {
        return asistenciaRepository.findByAula_IdAndFecha(idAula, fecha);
    }

    // ✅ Obtener asistencias de un aula
    public List<Asistencia> obtenerAsistenciasPorAula(Integer idAula) {
        return asistenciaRepository.findByAula_Id(idAula);
    }

    // ✅ Obtener asistencias en rango
    public List<Asistencia> obtenerAsistenciasPorRangoFechas(Integer idAula, LocalDate inicio, LocalDate fin) {
        return asistenciaRepository.findByAula_IdAndFechaBetween(idAula, inicio, fin);
    }

    // ✅ Listar todas
    public List<Asistencia> listarTodas() {
        return asistenciaRepository.findAll();
    }

    // ✅ Obtener alumnos por aula (solo los que pertenecen a esa aula)
    public List<Alumno> obtenerAlumnosPorAula(Integer idAula) {
        Aula aula = aulaRepository.findById(idAula)
                .orElseThrow(() -> new RuntimeException("Aula no encontrada"));
        return aula.getAlumnos();
    }
    public List<Asistencia> obtenerHistorial(Integer idAula, Integer idAlumno,
                                             LocalDate fechaInicio, LocalDate fechaFin) {
        return asistenciaRepository.buscarHistorial(idAula, idAlumno, fechaInicio, fechaFin);
    }
}
