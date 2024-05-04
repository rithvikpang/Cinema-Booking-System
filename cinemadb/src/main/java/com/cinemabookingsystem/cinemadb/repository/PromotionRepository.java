package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Promotion;

import java.util.Optional;


@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    @Query(value = "SELECT * FROM promotion ORDER BY promotion_id DESC LIMIT 1", nativeQuery = true)
    Promotion findLatestPromotion();
    Optional<Promotion> findByCode(String code);
}
