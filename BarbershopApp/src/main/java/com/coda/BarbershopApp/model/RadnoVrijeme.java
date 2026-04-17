package com.coda.BarbershopApp.model;

import com.coda.BarbershopApp.enums.DanUSedmici;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class RadnoVrijeme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalTime pocetak;
    private LocalTime kraj;
    @Enumerated(EnumType.STRING)
    private DanUSedmici dan;
    @ManyToOne
    @JoinColumn(name = "frizer_id")
    private Frizer frizer;
}
