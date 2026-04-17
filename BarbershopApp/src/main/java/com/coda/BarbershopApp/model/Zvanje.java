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
public class Zvanje {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(EnumType.STRING)
    @Column(name = "naziv")
    private ZvanjeNaziv zvanjeNaziv;
}
