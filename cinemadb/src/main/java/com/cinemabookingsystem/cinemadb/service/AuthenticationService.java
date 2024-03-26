package com.cinemabookingsystem.cinemadb.service;

public interface AuthenticationService {
    public boolean authenticate(String email, String rawPassword);
}
