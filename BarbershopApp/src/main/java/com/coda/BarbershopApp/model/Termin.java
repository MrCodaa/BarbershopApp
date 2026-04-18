package com.coda.BarbershopApp.model;

import com.coda.BarbershopApp.enums.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Termin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime datumPocetak;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    @JoinColumn(name = "korisnik_id",nullable = false)
    private Korisnik korisnik;
    @ManyToOne
    @JoinColumn(name = "frizer_id",nullable = false)
    private Frizer frizer;
    @ManyToOne
    @JoinColumn(name = "zvanjeUslugaCijena_id",nullable = false)
    private ZvanjeUslugaCijena zvanjeUslugaCijena;
}
