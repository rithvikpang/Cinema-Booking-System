package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.VerifiedUser;;

@Repository
public interface VerifiedUserRepository extends JpaRepository<VerifiedUser, Integer> {
    
}
