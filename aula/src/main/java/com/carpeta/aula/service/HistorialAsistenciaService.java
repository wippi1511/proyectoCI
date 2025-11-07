package com.carpeta.aula.service;

import com.carpeta.aula.model.HistorialAsistencia;
import com.carpeta.aula.repo.HistorialAsistenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class HistorialAsistenciaService {

    @Autowired
    private HistorialAsistenciaRepository repo;

    public List<HistorialAsistencia> listarTodo() {
        return repo.findAll();
    }

    public List<HistorialAsistencia> filtrar(Integer idaula, Integer idalumno, LocalDate inicio, LocalDate fin) {

        if (idaula != null && inicio != null && fin != null) {
            return repo.findByIdaulaAndFechaBetween(idaula, inicio, fin);
        }

        if (idalumno != null && inicio != null && fin != null) {
            return repo.findByIdalumnoAndFechaBetween(idalumno, inicio, fin);
        }

        if (idaula != null) return repo.findByIdaula(idaula);
        if (idalumno != null) return repo.findByIdalumno(idalumno);
        if (inicio != null && fin != null) return repo.findByFechaBetween(inicio, fin);

        return repo.findAll();
    }
}
