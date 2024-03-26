package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import com.cinemabookingsystem.cinemadb.model.User;

import jakarta.transaction.Transactional;

import java.time.Instant;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private MailServiceImpl mailService;

    // constructor autowired to pass in encoder instance
    public RegistrationServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void registerUser(@RequestBody User user, String url) {
        
        // Hashed password
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        user.setCreated_at(Instant.now());
        userRepository.save(user);

        // send verification email
        mailService.sendVerificationEmail(user.getEmail(), url);
        
    }

    // hash password before storing
    @Override
    public String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    @SuppressWarnings("null")
    @Transactional
    @Override
    public void verifyUser(String email) {
        User user = userRepository.findById(email).orElseThrow();
        user.setIsverified(true);
        userRepository.save(user);
    }

    // verify password
}
