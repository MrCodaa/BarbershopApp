package com.coda.BarbershopApp.repository;

import com.coda.BarbershopApp.model.Frizer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FrizerRepository extends JpaRepository<Frizer,Integer> {

}
