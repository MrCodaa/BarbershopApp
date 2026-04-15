package com.coda.BarbershopApp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class UslugaCijena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private BigDecimal cijena;
    @ManyToOne
    @JoinColumn(name = "frizer_id",nullable = false)
    private Frizer frizer;
    @ManyToOne
    @JoinColumn(name = "usluga_id",nullable = false)
    private Usluga usluga;
}
