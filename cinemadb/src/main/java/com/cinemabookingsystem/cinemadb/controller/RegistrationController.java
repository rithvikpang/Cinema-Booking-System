package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping
    public ResponseEntity<?> registerUser(@Validated @RequestBody User user, Errors errors) {
    if (errors.hasErrors()) {
        // Return a bad request with the validation errors
        return ResponseEntity.badRequest().body(errors.getAllErrors());
    }

    user.setStatus("Inactive");
    // Hash password and save user
    userRepository.save(user);

    return ResponseEntity.ok().body("User registered successfully");
}

    
}
