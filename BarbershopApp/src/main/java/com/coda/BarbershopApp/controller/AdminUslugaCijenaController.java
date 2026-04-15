package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.UslugaCijena;
import com.coda.BarbershopApp.service.UslugaCijenaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminUslugaCijenaController {
    @Autowired
    UslugaCijenaService uslugeCijenaService;

    @GetMapping("/uslugeCijena")
    public ResponseEntity<?> vratiUslugeCijena(){
        List<UslugaCijena> uslugeCijena = uslugeCijenaService.vratiUslugeCijena();
        if(uslugeCijena != null) {
            return new ResponseEntity<>(uslugeCijena, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Ne postoji radno vrijeme", HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/uslugeCijena")
    public ResponseEntity<String> dodajUsluguCijena(@RequestBody UslugaCijena uslugaCijena){
        try {
            uslugeCijenaService.dodajUsluguCijena(uslugaCijena);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/uslugeCijena/{id}")
    public ResponseEntity<String> obrisiUsluguCijena(@PathVariable int id){
        try {
            uslugeCijenaService.obrisiUsluguCijena(id);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/uslugeCijena/{id}")
    public ResponseEntity<String> promijeniUsluguCijena(@PathVariable int id, @RequestBody UslugaCijena uslugaCijena) {
        try {
            uslugaCijena.setId(id);
            uslugeCijenaService.promijeniUsluguCijena(uslugaCijena);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }
    }

}
