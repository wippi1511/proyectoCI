package com.carpeta.aula.repo;

import com.carpeta.aula.model.AulaAlumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AulaAlumnoRepository extends JpaRepository<AulaAlumno,Integer> {
}
