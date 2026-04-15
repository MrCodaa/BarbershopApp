package com.coda.BarbershopApp.repository;

import com.coda.BarbershopApp.model.Termin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TerminRepository extends JpaRepository<Termin,Integer> {

    // Upiti koji mijenjaju podatke trebaju da imaju i @Modifying
    @Modifying
    @Query("UPDATE Termin t SET t.status = 'OTKAZAN' WHERE t.id = :id")
    void otkaziTermin(int id);

}
