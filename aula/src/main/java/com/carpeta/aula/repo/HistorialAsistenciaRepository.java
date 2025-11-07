package com.carpeta.aula.repo;

import com.carpeta.aula.model.HistorialAsistencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface HistorialAsistenciaRepository extends JpaRepository<HistorialAsistencia, Integer> {

    List<HistorialAsistencia> findByIdaula(Integer idaula);

    List<HistorialAsistencia> findByIdalumno(Integer idalumno);

    List<HistorialAsistencia> findByFechaBetween(LocalDate inicio, LocalDate fin);

    List<HistorialAsistencia> findByIdaulaAndFechaBetween(Integer idaula, LocalDate inicio, LocalDate fin);

    List<HistorialAsistencia> findByIdalumnoAndFechaBetween(Integer idalumno, LocalDate inicio, LocalDate fin);
}
