package com.carpeta.aula.model;


import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "rol")
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idrol;

    private String rol;

    @OneToMany(mappedBy = "rol")
    private List<Usuario> usuarios;

    // Getters y Setters
    public Integer getIdrol() { return idrol; }
    public void setIdrol(Integer idrol) { this.idrol = idrol; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
