package com.coda.BarbershopApp.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TerminDTO {
    @NotNull
    @Positive
    private int korisnikId;
    @NotNull
    @Positive
    private int frizerId;
    @NotNull
    @Positive
    private  int zvanjeUslugaCijenaId;
    private LocalDateTime datumPocetak;
}
