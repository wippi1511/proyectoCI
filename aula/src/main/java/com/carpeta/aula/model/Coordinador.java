package com.carpeta.aula.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "coordinador")
public class Coordinador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idcoordinador;

    @OneToOne
    @JoinColumn(name = "idusuario", nullable = false)
    private Usuario usuario;

    private String nombre;
    private String apellidos;
    private LocalDate fechaIngreso = LocalDate.now();
    private String telefono;

    // Getters y Setters

    public Integer getIdcoordinador() {
        return idcoordinador;
    }

    public void setIdcoordinador(Integer idcoordinador) {
        this.idcoordinador = idcoordinador;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public LocalDate getFechaIngreso() {
        return fechaIngreso;
    }

    public void setFechaIngreso(LocalDate fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}