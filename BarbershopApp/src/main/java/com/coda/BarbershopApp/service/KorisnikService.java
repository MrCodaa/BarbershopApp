package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.model.Korisnik;
import com.coda.BarbershopApp.model.LoginDTO;
import com.coda.BarbershopApp.model.RegistracijaDTO;
import com.coda.BarbershopApp.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KorisnikService {
    @Autowired
    KorisnikRepository korisnikRepository;

    public void registracija(RegistracijaDTO korisnikDTORequest) {
        Korisnik korisnik = new Korisnik();
        korisnik.setIme(korisnikDTORequest.getIme());
        korisnik.setPrezime(korisnikDTORequest.getPrezime());
        korisnik.setEmail(korisnikDTORequest.getEmail());
        korisnik.setSifra(korisnikDTORequest.getSifra());
        korisnikRepository.save(korisnik);
    }

    public boolean login(LoginDTO loginDTO) {
        if(korisnikRepository.findByEmailAndSifra(loginDTO.getEmail(),loginDTO.getSifra()) != null){
            return true;
        }else {
            return false;
        }
    }

}
