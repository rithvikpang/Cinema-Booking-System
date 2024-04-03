package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Booking;

import java.util.LinkedHashSet;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    LinkedHashSet<Booking> findByUserEmail(String email);
}
