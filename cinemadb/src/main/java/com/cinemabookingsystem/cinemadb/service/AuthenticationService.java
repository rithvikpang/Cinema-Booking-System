package com.cinemabookingsystem.cinemadb.service;

public interface AuthenticationService {
    public int authenticate(String email, String rawPassword);
}
