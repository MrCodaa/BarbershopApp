package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.Frizer;
import com.coda.BarbershopApp.service.FrizerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminFrizerController {

    @Autowired
    FrizerService frizerService;

    @PostMapping("/admin/frizeri")
    public ResponseEntity<String> dodajFrizera(@RequestBody Frizer frizer){
        if(frizer != null) {
            frizerService.dodajFrizera(frizer);
            return new ResponseEntity<>("Uspjesno dodat!", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Neuspjesno dodat!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/admin/frizeri")
    public ResponseEntity<?> prikaziFrizere(){
        List<Frizer> frizeri = frizerService.vratiSveFrizere();
        if(frizeri.isEmpty()){
            return new ResponseEntity<>("Ne postoje frizeri", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(frizeri, HttpStatus.OK);
        }

    }

    @DeleteMapping("/admin/frizeri/{id}")
    public ResponseEntity<String> obrisiFrizera(@PathVariable int id){
        try{
            frizerService.obrisiFrizera(id);
            return new ResponseEntity<>("Uspjesno obrisan!", HttpStatus.OK);
        }catch(Exception e) {
            return new ResponseEntity<>("Neuspjesno obrisan!", HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("/admin/frizeri/{id}")
    public ResponseEntity<String> promijeniFrizera(@PathVariable int id ,@RequestBody Frizer frizer){
        try{
            frizer.setId(id);
            frizerService.promijeniFrizera(frizer);
            return new ResponseEntity<>("Uspjesno promijenjen!", HttpStatus.OK);
        }catch(Exception e) {
            return new ResponseEntity<>("Neuspjesno promijenjen!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
