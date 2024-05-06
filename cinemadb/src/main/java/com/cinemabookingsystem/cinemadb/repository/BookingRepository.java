package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserEmail(String email);
}
