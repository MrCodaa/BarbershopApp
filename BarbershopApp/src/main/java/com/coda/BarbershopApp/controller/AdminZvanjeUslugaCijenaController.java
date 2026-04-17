package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.ZvanjeUslugaCijena;
import com.coda.BarbershopApp.service.ZvanjeUslugaCijenaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminZvanjeUslugaCijenaController {
    @Autowired
    ZvanjeUslugaCijenaService zvanjeUslugeCijenaService;

    @GetMapping("/zvanjeUslugeCijena")
    public ResponseEntity<?> vratiZvanjeUslugeCijena(){
        List<ZvanjeUslugaCijena> zvanjeUslugeCijena = zvanjeUslugeCijenaService.vratiZvanjeUslugeCijena();
        if(zvanjeUslugeCijena.isEmpty()) {
            return new ResponseEntity<>("Ne postoji radno vrijeme", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(zvanjeUslugeCijena, HttpStatus.OK);
        }

    }

    @PostMapping("/zvanjeUslugeCijena")
    public ResponseEntity<String> dodajZvanjeUsluguCijena(@RequestBody ZvanjeUslugaCijena uslugaCijena){
        try {
            zvanjeUslugeCijenaService.dodajZvanjeUsluguCijena(uslugaCijena);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/zvanjeUslugeCijena/{id}")
    public ResponseEntity<String> obrisiUsluguCijena(@PathVariable int id){
        try {
            zvanjeUslugeCijenaService.obrisiZvanjeUsluguCijena(id);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/zvanjeUslugeCijena/{id}")
    public ResponseEntity<String> promijeniUsluguCijena(@PathVariable int id, @RequestBody ZvanjeUslugaCijena zvanjeUslugaCijena) {
        try {
            zvanjeUslugaCijena.setId(id);
            zvanjeUslugeCijenaService.promijeniZvanjeUsluguCijena(zvanjeUslugaCijena);
            return new ResponseEntity<>("Uspjesno", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Neuspjesno", HttpStatus.NOT_FOUND);
        }
    }

}
