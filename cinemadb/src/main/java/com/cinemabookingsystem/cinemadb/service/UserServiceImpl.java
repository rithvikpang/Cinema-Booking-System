package com.cinemabookingsystem.cinemadb.service;

import java.time.Instant;
import java.util.*;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cinemabookingsystem.cinemadb.dto.UserDTO;
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
    
    @Autowired
    private MailServiceImpl mailService;

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
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
    
        // Update the user's details
        existingUser.setUserId(user.getUserId());
        existingUser.setAdmin(user.isAdmin());
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
        mailService.sendVerificationCode(user);
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

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(user.getEmail());
            userDTO.setFirstname(user.getFirstname());
            userDTO.setLastname(user.getLastname());
            userDTO.setIsadmin(user.isAdmin());
            userDTO.setUser_id(user.getUserId());
            // Map other fields as needed
            userDTOs.add(userDTO);
        }
    return userDTOs;
    }

    public UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstname(user.getFirstname());
        userDTO.setLastname(user.getLastname());
        userDTO.setAddress(user.getAddress());
        userDTO.setAge(user.getAge());
        userDTO.setCity(user.getCity());
        userDTO.setState(user.getState());
        userDTO.setZip(user.getZip());
        userDTO.setUser_id(user.getUserId());
        userDTO.setIsadmin(user.isAdmin());
        // Map other properties as needed
        return userDTO;
    }

    @Transactional
    public void deleteUserProfile(String email) {
        // Retrieve the user entity from the database
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Delete the user
            userRepository.delete(user);
        } else {
            // Handle the case when the user is not found
            throw new RuntimeException("User with email " + email + " not found");
        }
    }
    // Implement other methods as needed
}
