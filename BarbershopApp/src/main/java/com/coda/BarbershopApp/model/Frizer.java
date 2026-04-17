package com.coda.BarbershopApp.model;

import com.coda.BarbershopApp.enums.ZvanjeNaziv;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @NotBlank
    @Size(min = 3)
    private String ime;
    @NotBlank
    @Size(min = 3)
    private String prezime;
//    Not blank se koristi za stringove, a not null za objekte
//    Not null dozvoljava prazne stringove, a not empty stringove sastavljene od znaka razmaka
    @NotNull
    @ManyToOne
    @JoinColumn(name = "zvanje_id")
    private Zvanje zvanje;
    @NotBlank
    private String slikaUrl;

}
