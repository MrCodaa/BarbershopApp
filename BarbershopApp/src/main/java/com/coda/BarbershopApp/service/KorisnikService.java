package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.model.Korisnik;
import com.coda.BarbershopApp.model.KorisnikDTORequest;
import com.coda.BarbershopApp.repository.KorisnikRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KorisnikService {
    @Autowired
    KorisnikRepository korisnikRepository;

    public void registracija(KorisnikDTORequest korisnikDTORequest) {
        Korisnik korisnik = new Korisnik();
        korisnik.setIme(korisnikDTORequest.getIme());
        korisnik.setPrezime(korisnikDTORequest.getPrezime());
        korisnik.setEmail(korisnikDTORequest.getEmail());
        korisnik.setSifra(korisnikDTORequest.getSifra());
        korisnikRepository.save(korisnik);
    }

}
