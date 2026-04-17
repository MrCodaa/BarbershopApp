package com.coda.BarbershopApp.repository;

import com.coda.BarbershopApp.model.Korisnik;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface KorisnikRepository extends JpaRepository<Korisnik,Integer> {


    Korisnik findByEmailAndSifra(String email, String sifra);
}

