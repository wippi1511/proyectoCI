package com.carpeta.aula.service;

import com.carpeta.aula.model.MaterialApoyo;
import com.carpeta.aula.model.MaterialApoyo.Estado;
import com.carpeta.aula.repo.MaterialApoyoRepository;
import com.carpeta.aula.repo.CursoRepository;
import com.carpeta.aula.repo.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;

@Service
public class MaterialService {

    @Autowired private MaterialApoyoRepository repo;
    @Autowired private CursoRepository cursoRepo;
    @Autowired private ProfesorRepository profesorRepo;
    @Autowired private FileStorageService storage;

    public List<MaterialApoyo> listarPorCurso(Integer idcurso) {
        return repo.findByCursoId(idcurso);
    }

    public List<MaterialApoyo> listarPendientes() {
        return repo.findByEstado(Estado.Pendiente);
    }

    public MaterialApoyo subirMaterial(MultipartFile file, Integer idcurso, Integer idprofesor) {
        String ruta = storage.store(file);
        MaterialApoyo m = new MaterialApoyo();
        m.setNombreArchivo(file.getOriginalFilename());
        m.setTipoArchivo(file.getContentType());
        m.setRutaArchivo(ruta);
        m.setFechaSubida(LocalDate.now());
        m.setCurso(cursoRepo.findById(idcurso).orElse(null));
        m.setProfesor(profesorRepo.findById(idprofesor).orElse(null));
        m.setEstado(Estado.Pendiente);
        return repo.save(m);
    }

    public MaterialApoyo actualizarEstado(Integer id, Estado nuevoEstado) {
        MaterialApoyo m = repo.findById(id).orElseThrow();
        m.setEstado(nuevoEstado);
        return repo.save(m);
    }
}
