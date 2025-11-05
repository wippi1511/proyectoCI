package com.carpeta.aula.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "aula")
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToMany(mappedBy = "aula", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<AulaDia> dias;

    public List<AulaDia> getDias() {
        return dias;
    }

    public void setDias(List<AulaDia> dias) {
        this.dias = dias;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "idprofesor")
    @JsonManagedReference
    private Profesor profesor;

    @ManyToOne
    @JoinColumn(name = "idcurso")
    @JsonManagedReference
    private Curso curso;

    @ManyToMany
    @JoinTable(
            name = "aula_alumnos",
            joinColumns = @JoinColumn(name = "idaula"),
            inverseJoinColumns = @JoinColumn(name = "idalumno")
    )
    @com.fasterxml.jackson.annotation.JsonManagedReference
    private List<Alumno> alumnos;

    // Getters y Setters

    public Integer getIdaula() {
        return id;
    }

    public void setIdaula(Integer id) {
        this.id = id;
    }




    public Profesor getProfesor() {
        return profesor;
    }

    public void setProfesor(Profesor profesor) {
        this.profesor = profesor;
    }

    public Curso getCurso() {
        return curso;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public List<Alumno> getAlumnos() {
        return alumnos;
    }

    public void setAlumnos(List<Alumno> alumnos) {
        this.alumnos = alumnos;
    }
}


