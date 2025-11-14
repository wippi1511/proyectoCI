package com.carpeta.aula.service;

import com.carpeta.aula.model.Silabo;
import com.carpeta.aula.repo.SilaboRepository;
import com.carpeta.aula.repo.CursoRepository;
import com.carpeta.aula.repo.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;
import java.util.List;

@Service
public class SilaboService {

    @Autowired private SilaboRepository repo;
    @Autowired private CursoRepository cursoRepo;
    @Autowired private ProfesorRepository profesorRepo;
    @Autowired private FileStorageService storage;

    public List<Silabo> listarPorCurso(Integer idcurso) {
        return repo.findByCursoId(idcurso);
    }

    public Silabo subirSilabo(MultipartFile file, Integer idcurso, Integer idprofesor) {
        String ruta = storage.store(file);
        Silabo s = new Silabo();
        s.setNombreArchivo(file.getOriginalFilename());
        s.setTipoArchivo(file.getContentType());
        s.setRutaArchivo(ruta);
        s.setFechaSubida(LocalDate.now());
        s.setCurso(cursoRepo.findById(idcurso).orElse(null));
        s.setProfesor(profesorRepo.findById(idprofesor).orElse(null));
        return repo.save(s);
    }
}
