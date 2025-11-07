package com.carpeta.aula.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "historial_asistencia")
public class HistorialAsistencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idhistorial;

    private Integer idasistencia;
    private Integer idaula;
    private Integer idalumno;
    private LocalDate fecha;
    private String estado;
    private String observacion;
    private String tipoOperacion;
    private LocalDateTime fechaRegistro;
    private HistorialAsistencia() {}

    public Integer getIdhistorial() {
        return idhistorial;
    }

    public void setIdhistorial(Integer idhistorial) {
        this.idhistorial = idhistorial;
    }

    public Integer getIdasistencia() {
        return idasistencia;
    }

    public void setIdasistencia(Integer idasistencia) {
        this.idasistencia = idasistencia;
    }

    public Integer getIdalumno() {
        return idalumno;
    }

    public void setIdalumno(Integer idalumno) {
        this.idalumno = idalumno;
    }

    public Integer getIdaula() {
        return idaula;
    }

    public void setIdaula(Integer idaula) {
        this.idaula = idaula;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getTipoOperacion() {
        return tipoOperacion;
    }

    public void setTipoOperacion(String tipoOperacion) {
        this.tipoOperacion = tipoOperacion;
    }

    public LocalDateTime getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(LocalDateTime fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }
}
