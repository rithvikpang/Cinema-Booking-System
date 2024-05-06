package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemabookingsystem.cinemadb.model.SeatStatus;
import com.cinemabookingsystem.cinemadb.model.Show;

import java.util.Set;

@Repository
public interface SeatStatusRepository extends JpaRepository<SeatStatus, Integer> {
    Set<SeatStatus> findByShow(Show show);
}
