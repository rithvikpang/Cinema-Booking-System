package com.cinemabookingsystem.cinemadb.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Suspension;

@Repository
public interface SuspensionRepository extends JpaRepository<Suspension, Integer> {
    List<Suspension> findByEndDateAfter(LocalDate date);
}