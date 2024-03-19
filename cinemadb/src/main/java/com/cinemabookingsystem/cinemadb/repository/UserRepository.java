package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cinemabookingsystem.cinemadb.model.User;

public interface UserRepository extends JpaRepository<User, String> {
}

