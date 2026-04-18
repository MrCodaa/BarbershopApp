package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.RadnoVrijeme;
import com.coda.BarbershopApp.service.RadnoVrijemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminRadnoVrijemeController {

    @Autowired
    RadnoVrijemeService radnoVrijemeService;

    @GetMapping("/admin/radno_vrijeme")
    public ResponseEntity<?> vratiRadnoVrijeme(){
        List<RadnoVrijeme> radnoVrijeme = radnoVrijemeService.vratiRadnoVrijeme();
        if(!radnoVrijeme.isEmpty()) {
            return new ResponseEntity<>(radnoVrijeme, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Ne postoji radno vrijeme", HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/admin/radno_vrijeme")
    public ResponseEntity<String> dodajRadnoVrijeme(@RequestBody RadnoVrijeme radnoVrijeme){
        try {
            radnoVrijemeService.dodajRadnoVrijeme(radnoVrijeme);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/admin/radno_vrijeme/{id}")
    public ResponseEntity<String> obrisiRadnoVrijeme(@PathVariable int id){
        try {
            radnoVrijemeService.obrisiRadnoVrijeme(id);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/admin/radno_vrijeme/{id}")
    public ResponseEntity<String> promijeniRadnoVrijeme(@PathVariable int id, @RequestBody RadnoVrijeme radnoVrijeme){
        try {
            radnoVrijeme.setId(id);
            radnoVrijemeService.promijeniRadnoVrijeme(radnoVrijeme);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




}
