package com.carpeta.aula.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "cursos")
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idcurso;

    private String nombre;
    private String duracion;
    private String estado = "Activo";

    @OneToMany(mappedBy = "curso")
    private List<Aula> aulas;

    @OneToMany(mappedBy = "curso")
    private List<Ficha> fichas;

    @OneToMany(mappedBy = "curso")
    private List<Silabo> silabos;


    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDuracion() {
        return duracion;
    }

    public void setDuracion(String duracion) {
        this.duracion = duracion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getIdcurso() {
        return idcurso;
    }

    public void setIdcurso(Integer idcurso) {
        this.idcurso = idcurso;
    }
}
