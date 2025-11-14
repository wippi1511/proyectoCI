package com.carpeta.aula.service;

import com.carpeta.aula.model.Profesor;
// import com.carpeta.aula.model.Usuario;
import com.carpeta.aula.repo.ProfesorRepository;
//import com.carpeta.aula.repo.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;

    // @Autowired
    // private UsuarioRepository usuarioRepository;

    // 🔹 Listar todos los profesores
    public List<Profesor> listarProfesores() {
        return profesorRepository.findAll();
    }

    // 🔹 Obtener un profesor
    public Profesor obtenerPorId(Integer id) {
        return profesorRepository.findById(id).orElse(null);
    }

    // 🔹 Crear un nuevo profesor
    public Profesor crearProfesor(Profesor profesor) {
        // // if (profesor.getUsuario() != null && profesor.getUsuario().getId() != null) {
        // //     Usuario usuario = usuarioRepository.findById(profesor.getUsuario().getId())
        // //             .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        //     profesor.setUsuario(usuario);
        // }
        return profesorRepository.save(profesor);
    }

    // 🔹 Actualizar un profesor
    public Profesor actualizarProfesor(Integer id, Profesor nuevosDatos) {
        Profesor exist = profesorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profesor no encontrado"));

        exist.setDni(nuevosDatos.getDni());
        exist.setNombre(nuevosDatos.getNombre());
        exist.setApellidos(nuevosDatos.getApellidos());
        exist.setGradoAcademico(nuevosDatos.getGradoAcademico());
        exist.setFechaIngreso(nuevosDatos.getFechaIngreso());
        exist.setTelefono(nuevosDatos.getTelefono());

        // if (nuevosDatos.getUsuario() != null && nuevosDatos.getUsuario().getId() != null) {
        //     Usuario usuario = usuarioRepository.findById(nuevosDatos.getUsuario().getId())
        //             .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        //     exist.setUsuario(usuario);
        // }

        return profesorRepository.save(exist);
    }

    // 🔹 Eliminar profesor
    public void eliminarProfesor(Integer id) {
        profesorRepository.deleteById(id);
    }
}