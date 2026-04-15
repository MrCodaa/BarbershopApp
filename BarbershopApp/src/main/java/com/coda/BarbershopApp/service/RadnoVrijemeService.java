package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.model.RadnoVrijeme;
import com.coda.BarbershopApp.repository.RadnoVrijemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RadnoVrijemeService {

    @Autowired
    RadnoVrijemeRepository repo;

    public List<RadnoVrijeme> vratiRadnoVrijeme() {
        return repo.findAll();
    }

    public void obrisiRadnoVrijeme(int id) {
        repo.deleteById(id);
    }


    public void dodajRadnoVrijeme(RadnoVrijeme radnoVrijeme) {
        repo.save(radnoVrijeme);
    }


    public void promijeniRadnoVrijeme(RadnoVrijeme radnoVrijeme) {
        repo.save(radnoVrijeme);
    }

}
