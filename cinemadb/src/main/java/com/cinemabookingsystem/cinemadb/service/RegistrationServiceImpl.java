package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinemabookingsystem.cinemadb.repository.UserRepository;

import jakarta.transaction.Transactional;

import com.cinemabookingsystem.cinemadb.model.UnverifiedUser;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UnverifiedUserRepository;

import java.time.Instant;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UnverifiedUserRepository unverifiedUserRepository;

    private final PasswordEncoder passwordEncoder;

    // constructor autowired to pass in encoder instance
    public RegistrationServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void registerUser(@RequestBody User user) {
        
        // Hashed password
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
        
        // Create an initilialize the user as unverified
        UnverifiedUser newUnverifiedUser = new UnverifiedUser();

        // Sets foreign key for enitity, user has a one to one relationship
        // with an unverified or verified user
        newUnverifiedUser.setUser(user);
        newUnverifiedUser.setCreated_at(Instant.now());
        newUnverifiedUser.setPassword(user.getPassword());
        unverifiedUserRepository.save(newUnverifiedUser);
    }

    // hash password before storing
    @Override
    public String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }
}
