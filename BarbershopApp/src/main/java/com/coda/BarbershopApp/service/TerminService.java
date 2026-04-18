package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.enums.Status;
import com.coda.BarbershopApp.model.Termin;
import com.coda.BarbershopApp.model.TerminDTO;
import com.coda.BarbershopApp.model.Usluga;
import com.coda.BarbershopApp.model.ZvanjeUslugaCijena;
import com.coda.BarbershopApp.repository.FrizerRepository;
import com.coda.BarbershopApp.repository.KorisnikRepository;
import com.coda.BarbershopApp.repository.TerminRepository;
import com.coda.BarbershopApp.repository.ZvanjeUslugaCijenaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TerminService {
    @Autowired
    TerminRepository repo;
    @Autowired
    KorisnikRepository repoKorisnik;
    @Autowired
    FrizerRepository repoFrizer;
    @Autowired
    ZvanjeUslugaCijenaRepository repoZUC;

    public List<Termin> vratiTermine() {
        return repo.findAll();
    }

    public void otkaziTermin(int id) {
        repo.otkaziTermin(id);
    }

    public void zakaziTermin(TerminDTO terminDTO){
        if(terminDTO.getDatumPocetak().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Ne mozete zakazati termin u proslosti");
        }
        boolean zauzetTermin = repo.existsByFrizerIdAndDatumPocetakAndStatus(
                terminDTO.getFrizerId(),
                terminDTO.getDatumPocetak(),
                Status.ZAKAZAN
        );
        if(zauzetTermin) {
            throw new RuntimeException("Ovaj termin je vec zauzet");
        }
        Termin termin = new Termin();
        termin.setKorisnik(repoKorisnik.findById(terminDTO.getKorisnikId()).orElseThrow());
        termin.setStatus(Status.ZAKAZAN);
        termin.setFrizer(repoFrizer.findById(terminDTO.getFrizerId()).orElseThrow());
        termin.setDatumPocetak(terminDTO.getDatumPocetak());
        termin.setZvanjeUslugaCijena(repoZUC.findById(terminDTO.getZvanjeUslugaCijenaId()).orElseThrow());
        repo.save(termin);
    }

}
