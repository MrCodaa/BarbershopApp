package com.coda.BarbershopApp.model;

import com.coda.BarbershopApp.enums.Uloga;
import com.coda.BarbershopApp.enums.Zvanje;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Korisnik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String ime;
    private String prezime;
    private String email;
    private String sifra;
    @Enumerated(EnumType.STRING)
    private Uloga uloga;
}
