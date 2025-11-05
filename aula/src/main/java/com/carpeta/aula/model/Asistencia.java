package com.carpeta.aula.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "asistencia")
public class Asistencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idasistencia;

    @ManyToOne
    @JoinColumn(name = "idalumno", nullable = false)
    @JsonIgnoreProperties({"aulas"})
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "idaula", nullable = false)
    @JsonIgnoreProperties({"alumnos", "dias", "profesor", "curso"})
    private Aula aula;

    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    private EstadoAsistencia estado;

    private String observacion;


    public enum EstadoAsistencia {
        Presente, Tarde, Ausente, Justificado
    }

    // Getters y setters

    public Integer getIdasistencia() {
        return idasistencia;
    }

    public void setIdasistencia(Integer idasistencia) {
        this.idasistencia = idasistencia;
    }

    public Alumno getAlumno() {
        return alumno;
    }

    public void setAlumno(Alumno alumno) {
        this.alumno = alumno;
    }

    public Aula getAula() {
        return aula;
    }

    public void setAula(Aula aula) {
        this.aula = aula;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public EstadoAsistencia getEstado() {
        return estado;
    }

    public void setEstado(EstadoAsistencia estado) {
        this.estado = estado;
    }
}

