package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.model.Usluga;
import com.coda.BarbershopApp.repository.UslugaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UslugeService {
    @Autowired
    UslugaRepository repo;

    public List<Usluga> vratiUsluge() {
        return repo.findAll();
    }

    public void dodajUslugu(Usluga usluga) {
        repo.save(usluga);
    }

    public void obrisiUslugu(int id) {
        repo.deleteById(id);
    }

    public void promijeniUslugu(Usluga usluga) {
        repo.save(usluga);
    }

}
