package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.User;

public interface UserService {
    User getUserByEmail(String email);

    void updateUser(User user, String email);

    boolean validateResetToken(String token);

    public void sendVerificationCode(User user);

    public boolean validateVerificationCode(String verificationCode);

    public boolean resetPassword(String userEmail, String newPassword);

    public boolean emailExists(String email);
}