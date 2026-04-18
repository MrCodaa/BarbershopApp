package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.*;
import com.coda.BarbershopApp.service.*;
import jakarta.validation.Valid;
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
    @Autowired
    TerminService terminService;

    @GetMapping("/frizeri")
    public ResponseEntity<?> prikaziFrizere(){
        List<Frizer> frizeri = frizerService.vratiSveFrizere();
        if(frizeri.isEmpty()){
            return new ResponseEntity<>("Ne postoje frizeri", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(frizeri, HttpStatus.OK);
        }
    }

    @GetMapping("/frizeri/{id}/usluge")
    public ResponseEntity<?> vratiUslugeSaCijenom(@PathVariable int id){
        List<ZvanjeUslugaCijena> uslugeSaCijenom = zvanjeUslugaCijenaService.vratiUslugeSaCijenom(id);
        if(!uslugeSaCijenom.isEmpty()) {
            return new ResponseEntity<>(uslugeSaCijenom, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Ne postoje usluge", HttpStatus.NOT_FOUND);
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

    @PostMapping("/slobodniTermini/zakaziTermin")
    public ResponseEntity<String> zakaziTermin(@RequestBody @Valid TerminDTO terminDTO ){
        terminService.zakaziTermin(terminDTO);
        return new ResponseEntity<>("Termin uspjesno zakazan", HttpStatus.OK);
    }


}
