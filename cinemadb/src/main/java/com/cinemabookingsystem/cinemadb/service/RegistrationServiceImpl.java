package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Transactional
    @Override
    public void registerUser(@RequestBody User user) {
        
        userRepository.save(user);
        
        // Create an initilialize the user as unverified
        UnverifiedUser newUnverifiedUser = new UnverifiedUser();

        newUnverifiedUser.setUser(user);
        newUnverifiedUser.setCreated_at(Instant.now());
        newUnverifiedUser.setPassword(user.getPassword());
        unverifiedUserRepository.save(newUnverifiedUser);
    }
}
