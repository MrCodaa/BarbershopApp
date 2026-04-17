package com.coda.BarbershopApp.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class RegistracijaDTO {
    @NotBlank
    @Size(min = 3, message = "Ime mora imati najmanje 3 karaktera")
    private String ime;
    @NotBlank
    @Size(min = 3, message = "Prezime mora imati najmanje 3 karaktera")
    private String prezime;
    @NotBlank
    @Email(message = "Email mora biti pravi email")
    private String email;
    @NotBlank
    @Size(min = 5, message = "Sifra mora imati najmanje 5 karaktera")
    private String sifra;
}
