package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.model.Usluga;
import com.coda.BarbershopApp.model.UslugaCijena;
import com.coda.BarbershopApp.repository.UslugaCijenaRepository;
import com.coda.BarbershopApp.repository.UslugaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UslugaCijenaService {
    @Autowired
    UslugaCijenaRepository repo;

    public List<UslugaCijena> vratiUslugeCijena() {
        return repo.findAll();
    }

    public void dodajUsluguCijena(UslugaCijena uslugaCijena) {
        repo.save(uslugaCijena);
    }

    public void obrisiUsluguCijena(int id) {
        repo.deleteById(id);
    }

    public void promijeniUsluguCijena(UslugaCijena uslugaCijena) {
        repo.save(uslugaCijena);
    }
}
