package com.cinemabookingsystem.cinemadb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Seat;
import com.cinemabookingsystem.cinemadb.model.Showroom;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    Optional<Seat> findByShowroomAndRowLetterAndSeatNumber(Showroom showroom, String row_letter, int seat_number);
}
