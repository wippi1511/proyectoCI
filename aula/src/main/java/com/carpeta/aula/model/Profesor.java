package com.carpeta.aula.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "profesor")
public class Profesor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idprofesor;

    @OneToOne
    @JoinColumn(name = "idusuario", nullable = false)
    private Usuario usuario;

    private String dni;
    private String nombre;
    private String apellidos;
    private String gradoAcademico;
    private LocalDate fechaIngreso = LocalDate.now();
    private String telefono;

    @OneToMany(mappedBy = "profesor")
    private List<Aula> aulas;

    @OneToMany(mappedBy = "profesor")
    private List<Ficha> fichas;

    @OneToMany(mappedBy = "profesor")
    private List<Silabo> silabos;

    @OneToMany(mappedBy = "profesor")
    private List<ProfesorCompetencia> competencias;

    // Getters y Setters
    public Integer getIdprofesor() { return idprofesor; }
    public void setIdprofesor(Integer idprofesor) { this.idprofesor = idprofesor; }
    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getApellidos() { return apellidos; }
    public void setApellidos(String apellidos) { this.apellidos = apellidos; }
    public String getGradoAcademico() { return gradoAcademico; }
    public void setGradoAcademico(String gradoAcademico) { this.gradoAcademico = gradoAcademico; }
    public LocalDate getFechaIngreso() { return fechaIngreso; }
    public void setFechaIngreso(LocalDate fechaIngreso) { this.fechaIngreso = fechaIngreso; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }
}