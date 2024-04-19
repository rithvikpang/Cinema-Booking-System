package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Promotion;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {

}
