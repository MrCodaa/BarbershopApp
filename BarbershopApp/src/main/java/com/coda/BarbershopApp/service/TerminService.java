package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.model.Termin;
import com.coda.BarbershopApp.model.Usluga;
import com.coda.BarbershopApp.repository.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TerminService {
    @Autowired
    TerminRepository repo;

    public List<Termin> vratiTermine() {
        return repo.findAll();
    }

    public void otkaziTermin(int id) {
        repo.otkaziTermin(id);
    }
}
