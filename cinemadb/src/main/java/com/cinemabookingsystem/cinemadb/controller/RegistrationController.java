package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.service.RegistrationServiceImpl;



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
        registrationService.registerUser(user, "http://localhost:8080/api/registration");
    
        return ResponseEntity.ok().body("User registered successfully");
    }

    @GetMapping("/verify")
    public String verifyUser(@RequestParam String email) {
        registrationService.verifyUser(email);
        return "User verfied successfully";
    }
    
}
