package com.coda.BarbershopApp.repository;

import com.coda.BarbershopApp.enums.Status;
import com.coda.BarbershopApp.model.Termin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TerminRepository extends JpaRepository<Termin,Integer> {

    // Upiti koji mijenjaju podatke trebaju da imaju i @Modifying
    @Modifying
    @Query("UPDATE Termin t SET t.status = 'OTKAZAN' WHERE t.id = :id")
    void otkaziTermin(int id);

    List<Termin> findByFrizerIdAndDatumPocetakBetween(int id, LocalDateTime pocetak, LocalDateTime kraj);

    boolean existsByFrizerIdAndDatumPocetakAndStatus(int frizerId, LocalDateTime datumPocetak, Status status);
}
