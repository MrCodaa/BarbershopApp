package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.RadnoVrijeme;
import com.coda.BarbershopApp.model.Usluga;
import com.coda.BarbershopApp.service.UslugeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminUslugeController {
    @Autowired
    UslugeService uslugeService;

    @GetMapping("/admin/usluge")
    public ResponseEntity<?> vratiUsluge(){
        List<Usluga> usluge = uslugeService.vratiUsluge();
        if(usluge != null) {
            return new ResponseEntity<>(usluge, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Ne postoji radno vrijeme", HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/admin/usluge")
    public ResponseEntity<String> dodajUslugu(@RequestBody Usluga usluga){
        try {
            uslugeService.dodajUslugu(usluga);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/admin/usluge/{id}")
    public ResponseEntity<String> obrisiUslugu(@PathVariable int id){
        try {
            uslugeService.obrisiUslugu(id);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/admin/usluge/{id}")
    public ResponseEntity<String> promijeniUslugu(@PathVariable int id, @RequestBody Usluga usluga) {
        try {
            usluga.setId(id);
            uslugeService.promijeniUslugu(usluga);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }
    }





















}
