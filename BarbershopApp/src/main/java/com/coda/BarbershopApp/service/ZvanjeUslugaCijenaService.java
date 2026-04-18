package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.model.ZvanjeUslugaCijena;
import com.coda.BarbershopApp.repository.ZvanjeUslugaCijenaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZvanjeUslugaCijenaService {
    @Autowired
    ZvanjeUslugaCijenaRepository repo;

    public List<ZvanjeUslugaCijena> vratiZvanjeUslugeCijena() {
        return repo.findAll();
    }

    public void dodajZvanjeUsluguCijena(ZvanjeUslugaCijena zvanjeUslugaCijena) {
        repo.save(zvanjeUslugaCijena);
    }

    public void obrisiZvanjeUsluguCijena(int id) {
        repo.deleteById(id);
    }

    public void promijeniZvanjeUsluguCijena(ZvanjeUslugaCijena zvanjeUslugaCijena) {
        repo.save(zvanjeUslugaCijena);
    }

    public List<ZvanjeUslugaCijena> vratiUslugeSaCijenom(int id) {
        return repo.vratiUslugeSaCijenom(id);
    }
}
