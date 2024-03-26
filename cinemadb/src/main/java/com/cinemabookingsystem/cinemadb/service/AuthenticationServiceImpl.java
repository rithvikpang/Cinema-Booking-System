package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public boolean authenticate(String email, String rawPassword) {
        String hashedPassword = getHashedPassword(email);
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    // private method to getHashedPassword for security
    @SuppressWarnings("null")
    private String getHashedPassword(String email) {
        User user = userRepository.findById(email).orElseThrow();
        return user.getPassword();
    }
    
}
