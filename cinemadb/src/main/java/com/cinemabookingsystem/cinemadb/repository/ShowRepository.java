package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.Showroom;

import java.util.Set;
import java.time.LocalDate;


@Repository
public interface ShowRepository extends JpaRepository<Show, Integer> {
    Set<Show> findByDateAndShowroom(LocalDate date, Showroom showroom);
}
