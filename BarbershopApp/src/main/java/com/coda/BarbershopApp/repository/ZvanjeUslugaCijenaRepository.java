package com.coda.BarbershopApp.repository;

import com.coda.BarbershopApp.model.ZvanjeUslugaCijena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZvanjeUslugaCijenaRepository extends JpaRepository<ZvanjeUslugaCijena,Integer> {
    @Query("SELECT z FROM ZvanjeUslugaCijena z JOIN Frizer f ON z.zvanje.id = f.zvanje.id WHERE f.id = :id")
    List<ZvanjeUslugaCijena> vratiUslugeSaCijenom(int id);

}
