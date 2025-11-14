package com.carpeta.aula.service;

import com.carpeta.aula.model.Competencia;
import com.carpeta.aula.repo.CompetenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetenciaService {

    @Autowired
    private CompetenciaRepository competenciaRepository;

    // 🔹 Listar todas los competenciaes
    public List<Competencia> listarCompetencias() {
        return competenciaRepository.findAll();
    }

    // 🔹 Obtener una competencia
    public Competencia obtenerPorId(Integer id) {
        return competenciaRepository.findById(id).orElse(null);
    }

    // 🔹 Crear una nueva competencia
    public Competencia crearCompetencia(Competencia competencia) {
        return competenciaRepository.save(competencia);
    }

    // 🔹 Actualizar una competencia
    public Competencia actualizarCompetencia(Integer id, Competencia nuevosDatos) {
        Competencia exist = competenciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Competencia no encontrada"));

        exist.setNombre(nuevosDatos.getNombre());
        exist.setDescripcion(nuevosDatos.getDescripcion());

        return competenciaRepository.save(exist);
    }

    // 🔹 Eliminar competencia
    public void eliminarCompetencia(Integer id) {
        competenciaRepository.deleteById(id);
    }
}
