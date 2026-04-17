package com.coda.BarbershopApp.repository;

import com.coda.BarbershopApp.model.ZvanjeUslugaCijena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ZvanjeUslugaCijenaRepository extends JpaRepository<ZvanjeUslugaCijena,Integer> {
}
