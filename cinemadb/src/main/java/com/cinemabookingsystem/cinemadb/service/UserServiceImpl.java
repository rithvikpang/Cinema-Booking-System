package com.cinemabookingsystem.cinemadb.service;

import java.time.Instant;
import java.util.*;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.model.PasswordResetToken;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.PasswordResetTokenRepository;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;

import ch.qos.logback.core.util.Duration;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private PasswordResetTokenRepository tokenRepository;
    private JavaMailSender mailSender;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean emailExists(String email) {
        return userRepository.existsById(email);
    }

    @SuppressWarnings("null")
    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
        return user; // Assume you have a method to convert a User entity to a UserDTO
    }

    @SuppressWarnings("null")
    @Override
    public void updateUser(User user, String email) {
        // Fetch the existing user from the database
        User existingUser = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        // Update the user's details
        existingUser.setFirstname(user.getFirstname());
        existingUser.setLastname(user.getLastname());
        existingUser.setAddress(user.getAddress());
        existingUser.setAge(user.getAge());
        existingUser.setCity(user.getCity());
        existingUser.setState(user.getState());
        existingUser.setZip(user.getZip());

        // Save the updated user back to the database
        userRepository.save(existingUser);
    }

    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Override
    public void sendVerificationCode(User user) {
        String verificationCode = Jwts.builder()
                .setSubject(String.valueOf(user.getUserId()))
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000)) // 15 minutes
                .signWith(key)
                .compact();

        SimpleMailMessage verificationEmail = new SimpleMailMessage();
        verificationEmail.setFrom("teamb8cinema@gmail.com");
        verificationEmail.setTo(user.getEmail());
        verificationEmail.setSubject("Password Reset Token");
        verificationEmail.setText("Use the code to reset your password: " + verificationCode);
        mailSender.send(verificationEmail);
    }

    @Override
    public boolean validateVerificationCode(String verificationCode) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(verificationCode);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean resetPassword(String userEmail, String newPassword) {
        User user = getUserByEmail(userEmail);
        if (user == null) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return true;
    }

    @Override
    public void createAndSendPasswordResetToken(User user, String targetEmail) {
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUser(user);
        resetToken.setToken(token);
        resetToken.setExpiryDate(Instant.now().plus(java.time.Duration.ofMinutes(10))); // Token expires in 1 hour
        tokenRepository.save(resetToken);

        // Send token to user's email (implement email sending)
        SimpleMailMessage verificationEmail = new SimpleMailMessage();
        verificationEmail.setFrom("teamb8cinema@gmail.com");
        verificationEmail.setTo(targetEmail);
        verificationEmail.setSubject("Password Reset Token");
        verificationEmail.setText("Use the code to reset your password: " + token);
        mailSender.send(verificationEmail);

    }

    @Override
    public boolean validateResetToken(String token) {
        Optional<PasswordResetToken> resetToken = tokenRepository.findByToken(token);
        return resetToken.isPresent() && resetToken.get().getExpiryDate().isAfter(new Date().toInstant());
    }

    public void updatePassword(User user, String email) {
        // Fetch the existing user from the database
        User existingUser = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        // Update the user's details
        // Be sure not to update the email or password fields if that's not intended
        existingUser.setPassword(user.getPassword());
        // ... set other fields, but do NOT set email or password here

        // Save the updated user back to the database
        userRepository.save(existingUser);
    }

    // Implement other methods as needed
}
