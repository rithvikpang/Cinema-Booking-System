package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Theater;

@Repository
public interface TheaterRepository extends JpaRepository<Theater, Integer>{
    
}
