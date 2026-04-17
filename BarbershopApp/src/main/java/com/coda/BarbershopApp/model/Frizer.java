package com.coda.BarbershopApp.model;

import com.coda.BarbershopApp.enums.ZvanjeNaziv;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Frizer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String ime;
    private String prezime;
    @ManyToOne
    @JoinColumn(name = "zvanje_id")
    private Zvanje zvanje;
    private String slikaUrl;

}
