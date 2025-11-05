package com.carpeta.aula.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "competencias")
public class Competencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idcompetencia;

    private String nombre;
    private String descripcion;

    @OneToMany(mappedBy = "competencia")
    private List<ProfesorCompetencia> profesorCompetencias;

    public Integer getIdcompetencia() {
        return idcompetencia;
    }

    public void setIdcompetencia(Integer idcompetencia) {
        this.idcompetencia = idcompetencia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}