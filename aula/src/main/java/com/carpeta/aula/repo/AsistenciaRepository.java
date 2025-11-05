package com.carpeta.aula.repo;

import com.carpeta.aula.model.Asistencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AsistenciaRepository extends JpaRepository<Asistencia,Integer> {
    Optional<Asistencia> findByAula_IdAndAlumno_IdalumnoAndFecha(Integer idAula, Integer idAlumno, LocalDate fecha);

    List<Asistencia> findByAula_IdAndFecha(Integer idAula, LocalDate fecha);

    List<Asistencia> findByAula_IdAndFechaBetween(Integer idAula, LocalDate inicio, LocalDate fin);

    List<Asistencia> findByAula_Id(Integer idAula);

    @Query("SELECT a FROM Asistencia a " +
            "WHERE (:idAula IS NULL OR a.aula.id = :idAula) " +
            "AND (:idAlumno IS NULL OR a.alumno.idalumno = :idAlumno) " +
            "AND (:fechaInicio IS NULL OR a.fecha >= :fechaInicio) " +
            "AND (:fechaFin IS NULL OR a.fecha <= :fechaFin)")
    List<Asistencia> buscarHistorial(
            @Param("idAula") Integer idAula,
            @Param("idAlumno") Integer idAlumno,
            @Param("fechaInicio") LocalDate fechaInicio,
            @Param("fechaFin") LocalDate fechaFin);

}
