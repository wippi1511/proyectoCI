package com.carpeta.aula.repo;

import com.carpeta.aula.model.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Integer> {
    @Query("SELECT p FROM Profesor p WHERE p.usuario.estado = 'Activo'")
    List<Profesor> findProfesoresActivos();
}
