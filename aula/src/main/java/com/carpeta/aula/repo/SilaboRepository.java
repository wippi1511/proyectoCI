package com.carpeta.aula.repo;

import com.carpeta.aula.model.Silabo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SilaboRepository extends JpaRepository<Silabo, Integer> {
    List<Silabo> findByCursoId(Integer idcurso);
}
