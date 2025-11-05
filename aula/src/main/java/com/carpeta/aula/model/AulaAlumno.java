package com.carpeta.aula.model;

import jakarta.persistence.*;

@Entity
@Table(name = "aula_alumnos")
public class AulaAlumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idaula")
    private Aula aula;

    @ManyToOne
    @JoinColumn(name = "idalumno")
    private Alumno alumno;

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Aula getAula() {
        return aula;
    }

    public void setAula(Aula aula) {
        this.aula = aula;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }
}
