package com.coda.BarbershopApp.repository;

import com.coda.BarbershopApp.enums.DanUSedmici;
import com.coda.BarbershopApp.model.RadnoVrijeme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RadnoVrijemeRepository extends JpaRepository<RadnoVrijeme,Integer> {

    RadnoVrijeme findByFrizerIdAndDan(int id, DanUSedmici dan);
}
