package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.model.Frizer;
import com.coda.BarbershopApp.repository.FrizerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FrizerService {
    @Autowired
    FrizerRepository frizerRepository;


    public void dodajFrizera(Frizer frizer) {
        frizerRepository.save(frizer);
    }

    public List<Frizer> vratiSveFrizere() {
        return frizerRepository.findAll();
    }

    public void obrisiFrizera(int id) {
        frizerRepository.deleteById(id);
    }

    public void promijeniFrizera(Frizer frizer) {
        frizerRepository.save(frizer);
        // jer save radi update nad objektom ciji id posjeduje
    }

}
