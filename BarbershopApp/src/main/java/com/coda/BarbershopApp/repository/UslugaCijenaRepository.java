package com.coda.BarbershopApp.repository;

import com.coda.BarbershopApp.model.UslugaCijena;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UslugaCijenaRepository extends JpaRepository<UslugaCijena,Integer> {
}
