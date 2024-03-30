package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.User;

public interface UserService {
    User getUserByEmail(String email);
    void updateUser(User user, String email);
}