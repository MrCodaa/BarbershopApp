package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.Frizer;
import com.coda.BarbershopApp.model.Slot;
import com.coda.BarbershopApp.model.Usluga;
import com.coda.BarbershopApp.model.ZvanjeUslugaCijena;
import com.coda.BarbershopApp.service.FrizerService;
import com.coda.BarbershopApp.service.SlotService;
import com.coda.BarbershopApp.service.UslugeService;
import com.coda.BarbershopApp.service.ZvanjeUslugaCijenaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class KorisnikController {

    @Autowired
    FrizerService frizerService;
    @Autowired
    ZvanjeUslugaCijenaService zvanjeUslugaCijenaService;
    @Autowired
    SlotService slotService;

    @GetMapping("/frizeri")
    public ResponseEntity<?> prikaziFrizere(){
        List<Frizer> frizeri = frizerService.vratiSveFrizere();
        if(frizeri == null){
            return new ResponseEntity<>("Ne postoje frizeri", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(frizeri, HttpStatus.OK);
        }
    }

    @GetMapping("/frizeri/{id}/usluge")
    public ResponseEntity<?> vratiUslugeSaCijenom(@PathVariable int id){
        List<ZvanjeUslugaCijena> uslugeSaCijenom = zvanjeUslugaCijenaService.vratiUslugeSaCijenom(id);
        if(uslugeSaCijenom != null) {
            return new ResponseEntity<>(uslugeSaCijenom, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Ne postoji radno vrijeme", HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/frizeri/{id}/slobodniTermini")
    public ResponseEntity<?> vratiSlobodneTermine(@PathVariable int id, @RequestParam LocalDate datum){
        List<Slot> slobodniSlotovi = slotService.vratiSlobodneSlotov(id,datum);
        if(slobodniSlotovi.isEmpty()) {
            return new ResponseEntity<>("Ne postoji radno vrijeme", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(slobodniSlotovi, HttpStatus.OK);
        }
    }


}
