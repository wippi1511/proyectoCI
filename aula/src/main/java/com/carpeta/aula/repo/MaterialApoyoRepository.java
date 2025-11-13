package com.carpeta.aula.repo;

import com.carpeta.aula.model.MaterialApoyo;
import com.carpeta.aula.model.MaterialApoyo.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MaterialApoyoRepository extends JpaRepository<MaterialApoyo, Integer> {
    List<MaterialApoyo> findByCursoId(Integer idcurso);
    List<MaterialApoyo> findByEstado(Estado estado);
}
