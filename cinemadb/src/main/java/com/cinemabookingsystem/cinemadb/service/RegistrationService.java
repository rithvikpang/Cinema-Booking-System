package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.User;

public interface RegistrationService {
    public void registerUser(User user, String url);
    public void verifyUser(String email, String userId);
    public String hashPassword(String rawPassword);
}
