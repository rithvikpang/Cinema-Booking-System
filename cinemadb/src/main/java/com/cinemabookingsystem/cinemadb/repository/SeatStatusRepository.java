package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cinemabookingsystem.cinemadb.model.Seat;
import com.cinemabookingsystem.cinemadb.model.SeatStatus;
import com.cinemabookingsystem.cinemadb.model.Show;

import java.util.List;

@Repository
public interface SeatStatusRepository extends JpaRepository<SeatStatus, Integer> {
    List<SeatStatus> findByShow(Show show);
    List<SeatStatus> findBySeat(Seat seat);
}
