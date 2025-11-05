package com.carpeta.aula.repo;

import com.carpeta.aula.model.Historial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistorialRepository extends JpaRepository<Historial,Integer> {
}
