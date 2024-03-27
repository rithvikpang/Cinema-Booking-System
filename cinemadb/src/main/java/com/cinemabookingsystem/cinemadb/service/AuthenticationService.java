package com.cinemabookingsystem.cinemadb.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface AuthenticationService {
    public int authenticate(String email, String rawPassword);
}
