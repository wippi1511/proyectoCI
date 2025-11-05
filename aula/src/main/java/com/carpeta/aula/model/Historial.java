package com.carpeta.aula.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial")
public class Historial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idhistorial")
    private Integer idhistorial;

    @Column(name = "tipo_operacion", length = 10, nullable = false)
    private String tipoOperacion;

    @Column(name = "fecha_operacion", nullable = false)
    private LocalDateTime fechaOperacion;

    @Column(name = "idaula")
    private Integer idaula;

    @Column(name = "profesor_nombre", length = 100)
    private String profesorNombre;

    @Column(name = "curso_nombre", length = 100)
    private String cursoNombre;

    @Column(name = "dias", columnDefinition = "TEXT")
    private String dias;

    @Column(name = "cantidad_alumnos")
    private Integer cantidadAlumnos;

    // 🔹 Constructores
    public Historial() {}

    // 🔹 Getters y Setters
    public Integer getIdhistorial() {
        return idhistorial;
    }

    public void setIdhistorial(Integer idhistorial) {
        this.idhistorial = idhistorial;
    }

    public String getTipoOperacion() {
        return tipoOperacion;
    }

    public void setTipoOperacion(String tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

    public LocalDateTime getFechaOperacion() {
        return fechaOperacion;
    }

    public void setFechaOperacion(LocalDateTime fechaOperacion) {
        this.fechaOperacion = fechaOperacion;
    }

    public Integer getIdaula() {
        return idaula;
    }

    public void setIdaula(Integer idaula) {
        this.idaula = idaula;
    }

    public String getProfesorNombre() {
        return profesorNombre;
    }

    public void setProfesorNombre(String profesorNombre) {
        this.profesorNombre = profesorNombre;
    }

    public String getCursoNombre() {
        return cursoNombre;
    }

    public void setCursoNombre(String cursoNombre) {
        this.cursoNombre = cursoNombre;
    }

    public String getDias() {
        return dias;
    }

    public void setDias(String dias) {
        this.dias = dias;
    }

    public Integer getCantidadAlumnos() {
        return cantidadAlumnos;
    }

    public void setCantidadAlumnos(Integer cantidadAlumnos) {
        this.cantidadAlumnos = cantidadAlumnos;
    }
}
