package com.carpeta.aula.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String usuario;
    private String contrasena;

    @Lob
    private byte[] foto;

    private String correo;

    @Enumerated(EnumType.STRING)
    private EstadoUsuario estado = EstadoUsuario.Activo;

    @ManyToOne
    @JoinColumn(name = "idrol")
    private Roles  rol;

    @OneToOne(mappedBy = "usuario")
    private Profesor profesor;

    @OneToOne(mappedBy = "usuario")
    private Coordinador coordinador;

    public enum EstadoUsuario { Activo, Inactivo, Suspendido }

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    public byte[] getFoto() { return foto; }
    public void setFoto(byte[] foto) { this.foto = foto; }
    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }
    public EstadoUsuario getEstado() { return estado; }
    public void setEstado(EstadoUsuario estado) { this.estado = estado; }

}