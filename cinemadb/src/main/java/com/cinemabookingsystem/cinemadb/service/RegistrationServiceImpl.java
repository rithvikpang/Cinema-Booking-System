package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import com.cinemabookingsystem.cinemadb.repository.VerifiedUserRepository;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.model.VerifiedUser;
import com.cinemabookingsystem.cinemadb.model.VerifiedUser.Role;

import jakarta.transaction.Transactional;

import java.time.Instant;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerifiedUserRepository verifiedUserRepository;

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

    @Transactional
    @Override
    public void verifyUser(String email) {
        User user = userRepository.findById(email).orElseThrow();
        user.setIsverified(true);
        userRepository.save(user);

        //VerifiedUser newVerifiedUser = new VerifiedUser();
        ///newVerifiedUser.setUser(user);
        //newVerifiedUser.setPassword(user.getPassword());
        //newVerifiedUser.setCreated_at(user.getCreated_at());
        //newVerifiedUser.setRole(Role.verfiied_user);
        //verifiedUserRepository.save(newVerifiedUser);
    }

    // verify password
}
