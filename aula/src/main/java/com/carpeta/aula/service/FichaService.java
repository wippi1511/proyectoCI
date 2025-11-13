package com.carpeta.aula.service;

import com.carpeta.aula.model.Ficha;
import com.carpeta.aula.repo.FichaRepository;
import com.carpeta.aula.repo.CursoRepository;
import com.carpeta.aula.repo.ProfesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@Service
public class FichaService {

    @Autowired private FichaRepository repo;
    @Autowired private CursoRepository cursoRepo;
    @Autowired private ProfesorRepository profesorRepo;
    @Autowired private FileStorageService storage;

    public List<Ficha> listarPorCurso(Integer idcurso) {
        return repo.findByCursoId(idcurso);
    }

    public Ficha subirFicha(MultipartFile file, Integer idcurso, Integer idprofesor) {
        String ruta = storage.store(file);
        Ficha f = new Ficha();
        f.setNombreArchivo(file.getOriginalFilename());
        f.setTipoArchivo(file.getContentType());
        f.setRutaArchivo(ruta);
        f.setFechaSubida(LocalDate.now());
        f.setCurso(cursoRepo.findById(idcurso).orElse(null));
        f.setProfesor(profesorRepo.findById(idprofesor).orElse(null));
        return repo.save(f);
    }
}
