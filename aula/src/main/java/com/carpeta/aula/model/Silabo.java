package com.carpeta.aula.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "silabos")
public class Silabo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_archivo")
    private String nombreArchivo;

    @Column(name = "tipo_archivo")
    private String tipoArchivo;

    @Column(name = "ruta_archivo")
    private String rutaArchivo;

    @Column(name = "fecha_subida")
    private LocalDate fechaSubida;

    @ManyToOne
    @JoinColumn(name = "idcurso")
    private Curso curso;

    @ManyToOne
    @JoinColumn(name = "idprofesor")
    private Profesor profesor;

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNombreArchivo() { return nombreArchivo; }
    public void setNombreArchivo(String nombreArchivo) { this.nombreArchivo = nombreArchivo; }

    public String getTipoArchivo() { return tipoArchivo; }
    public void setTipoArchivo(String tipoArchivo) { this.tipoArchivo = tipoArchivo; }

    public String getRutaArchivo() { return rutaArchivo; }
    public void setRutaArchivo(String rutaArchivo) { this.rutaArchivo = rutaArchivo; }

    public LocalDate getFechaSubida() { return fechaSubida; }
    public void setFechaSubida(LocalDate fechaSubida) { this.fechaSubida = fechaSubida; }

    public Curso getCurso() { return curso; }
    public void setCurso(Curso curso) { this.curso = curso; }

    public Profesor getProfesor() { return profesor; }
    public void setProfesor(Profesor profesor) { this.profesor = profesor; }
}
