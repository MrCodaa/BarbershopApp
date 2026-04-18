package com.coda.BarbershopApp.service;

import com.coda.BarbershopApp.enums.DanUSedmici;
import com.coda.BarbershopApp.model.RadnoVrijeme;
import com.coda.BarbershopApp.model.Slot;
import com.coda.BarbershopApp.model.Termin;
import com.coda.BarbershopApp.repository.RadnoVrijemeRepository;
import com.coda.BarbershopApp.repository.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SlotService {
    @Autowired
    RadnoVrijemeRepository repoRV;
    @Autowired
    TerminRepository repoTermin;

    public List<Slot> vratiSlobodneSlotov(int id, LocalDate datum) {
        DanUSedmici dan = DanUSedmici.valueOf(datum.getDayOfWeek().name());
        RadnoVrijeme radnoVrijeme = repoRV.findByFrizerIdAndDan(id,dan);
        if (radnoVrijeme == null) {
            return new ArrayList<>();
        }
        LocalDateTime pocetak = datum.atStartOfDay();
        LocalDateTime kraj = datum.atTime(23,59,59);
        List<Termin> termini = repoTermin.findByFrizerIdAndDatumPocetakBetween(id,pocetak,kraj);
        LocalTime pocetakSlotova = radnoVrijeme.getPocetak();
        LocalTime krajSlotova = radnoVrijeme.getKraj();
        List<Slot> sviSlotovi = new ArrayList<>();
        List<Slot> zauzetiSlotovi = new ArrayList<>();
        while(pocetakSlotova.isBefore(krajSlotova)){
            Slot noviSlot = new Slot(pocetakSlotova,pocetakSlotova.plusMinutes(30));
            sviSlotovi.add(noviSlot);
            pocetakSlotova = pocetakSlotova.plusMinutes(30);
        }
        for (int i = 0; i < termini.size(); i++) {
            LocalTime pocetakTermina = termini.get(i).getDatumPocetak().toLocalTime();
            int trajanjeUsluge = termini.get(i).getZvanjeUslugaCijena().getUsluga().getTrajanje();
            int brojSlotova = (int)Math.ceil(trajanjeUsluge/30.0);
            for (int j = 0; j < brojSlotova; j++) {
                LocalTime krajTermina = pocetakTermina.plusMinutes(30);
                Slot noviSlot = new Slot(pocetakTermina,krajTermina);
                zauzetiSlotovi.add(noviSlot);
                pocetakTermina = pocetakTermina.plusMinutes(30);
            }
        }
        sviSlotovi.removeAll(zauzetiSlotovi);
        return  sviSlotovi;
    }





}
