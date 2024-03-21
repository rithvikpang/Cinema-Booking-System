package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.UnverifiedUser;

@Repository
public interface UnverifiedUserRepository extends JpaRepository<UnverifiedUser, Integer> {
}