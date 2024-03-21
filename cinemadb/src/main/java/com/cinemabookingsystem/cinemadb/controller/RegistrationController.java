package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.model.UnverifiedUser;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import com.cinemabookingsystem.cinemadb.service.RegistrationServiceImpl;
import com.cinemabookingsystem.cinemadb.repository.UnverifiedUserRepository;





@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    @Autowired
    private RegistrationServiceImpl registrationService;

    
    @PostMapping
    public ResponseEntity<?> registerUser(@Validated @RequestBody User user, Errors errors) {
        if (errors.hasErrors()) {
            // Return a bad request with the validation errors
            return ResponseEntity.badRequest().body(errors.getAllErrors());
       }
    
        user.setStatus("Inactive");
        // Hash password and save user
        registrationService.registerUser(user);
    
        return ResponseEntity.ok().body("User registered successfully");
    }
}
