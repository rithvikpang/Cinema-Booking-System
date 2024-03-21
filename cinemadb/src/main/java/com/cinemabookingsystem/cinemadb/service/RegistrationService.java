package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.User;

public interface RegistrationService {
    public void registerUser(User user);
    public String hashPassword(String rawPassword);
}
