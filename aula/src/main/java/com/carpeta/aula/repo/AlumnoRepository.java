package com.carpeta.aula.repo;

import com.carpeta.aula.model.Alumno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Integer> {
    List<Alumno> findByEstado(String estado);

}
