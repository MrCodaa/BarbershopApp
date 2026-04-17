package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.Korisnik;
import com.coda.BarbershopApp.model.KorisnikDTORequest;
import com.coda.BarbershopApp.service.KorisnikService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    KorisnikService korisnikService;

    @PostMapping("/register")
    public ResponseEntity<String> registracija(@RequestBody @Valid KorisnikDTORequest korisnikDTORequest){
        korisnikService.registracija(korisnikDTORequest);
        return new ResponseEntity<>("Uspjesno ste registrovani.", HttpStatus.OK);
    }

}
