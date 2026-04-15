package com.coda.BarbershopApp.model;

import com.coda.BarbershopApp.enums.Zvanje;
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
    private int id;
    private String ime;
    private String prezime;
    @Enumerated(EnumType.STRING)
    private Zvanje zvanje;
    private String slikaUrl;

}
