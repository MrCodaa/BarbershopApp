package com.coda.BarbershopApp.controller;

import com.coda.BarbershopApp.model.LoginDTO;
import com.coda.BarbershopApp.model.RegistracijaDTO;
import com.coda.BarbershopApp.service.KorisnikService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    KorisnikService korisnikService;

    @PostMapping("/register")
    public ResponseEntity<String> registracija(@RequestBody @Valid RegistracijaDTO korisnikDTORequest){
        korisnikService.registracija(korisnikDTORequest);
        return new ResponseEntity<>("Uspjesno ste registrovani.", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginDTO loginDTO){
        boolean postoji = korisnikService.login(loginDTO);
        if(postoji) {
            return new ResponseEntity<>("Uspjesno ste ulogovani.", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Pogresni kredencijali.", HttpStatus.UNAUTHORIZED);
        }
    }

}
