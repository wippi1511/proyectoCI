package com.carpeta.aula.repo;

import com.carpeta.aula.model.Ficha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FichaRepository extends JpaRepository<Ficha, Integer> {
    List<Ficha> findByCursoId(Integer idcurso);
}
