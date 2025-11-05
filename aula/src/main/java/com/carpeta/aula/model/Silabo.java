package com.carpeta.aula.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "silabos")
public class Silabo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nombreArchivo;
    private String tipoArchivo;
    private String rutaArchivo;
    private LocalDate fechaSubida = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "idcurso")
    private Curso curso;

    @ManyToOne
    @JoinColumn(name = "idprofesor")
    private Profesor profesor;
}
