package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.Termin;
import com.coda.BarbershopApp.model.Usluga;
import com.coda.BarbershopApp.service.TerminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminTerminController {
    @Autowired
    TerminService terminService;

    @GetMapping("/termini")
    public ResponseEntity<?> vratiTermine(){
        List<Termin> termini = terminService.vratiTermine();
        if(termini != null) {
            return new ResponseEntity<>(termini, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Ne postoji radno vrijeme", HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("/termini/{id}")
    public ResponseEntity<String> otkaziTermin(@PathVariable int id) {
        try {
            terminService.otkaziTermin(id);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }
    }

}
