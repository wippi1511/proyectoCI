package com.carpeta.aula.model;

import jakarta.persistence.*;

@Entity
@Table(name = "profesor_competencias")
public class ProfesorCompetencia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "idprofesor")
    private Profesor profesor;

    @ManyToOne
    @JoinColumn(name = "idcompetencia")
    private Competencia competencia;
}
