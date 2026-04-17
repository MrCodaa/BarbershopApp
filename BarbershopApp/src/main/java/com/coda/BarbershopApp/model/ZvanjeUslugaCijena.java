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
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"zvanje_id","usluga_id"})})
// moze postojati samo 1 cijena za 1 zvanje i 1 uslugu
public class ZvanjeUslugaCijena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private BigDecimal cijena;
    @ManyToOne
    @JoinColumn(name = "zvanje_id",nullable = false)
    private Zvanje zvanje;
    @ManyToOne
    @JoinColumn(name = "usluga_id",nullable = false)
    private Usluga usluga;
}
