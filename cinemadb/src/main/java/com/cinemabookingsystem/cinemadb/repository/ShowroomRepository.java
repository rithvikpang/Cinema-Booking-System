package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Showroom;

@Repository
public interface ShowroomRepository extends JpaRepository<Showroom, Integer> {

}
