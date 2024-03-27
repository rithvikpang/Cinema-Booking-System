package com.cinemabookingsystem.cinemadb.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemabookingsystem.cinemadb.service.AuthenticationServiceImpl;
import com.cinemabookingsystem.cinemadb.service.CustomUserDetailsService;
import com.cinemabookingsystem.cinemadb.service.MailServiceImpl;
import com.cinemabookingsystem.cinemadb.config.StatusCode;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    @Autowired
    private final AuthenticationServiceImpl authenticationService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private MailServiceImpl mailService;

    public final String siteUrl = "http://localhost:8080/api/registration";

    public AuthenticationController(AuthenticationServiceImpl authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginRequest.getEmail());
        int authenticationResult = authenticationService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        Map<String, Object> response = new HashMap<>();
        switch (authenticationResult) {
            case StatusCode.SUCCESS:
                String jwtToken = authenticationService.generateToken(userDetails);
                response.put("message", "Authentication successful");
                response.put("jwt", jwtToken);
                return ResponseEntity.ok(response);
            case StatusCode.USER_NOT_VERIFIED:
                // mailService.sendVerificationEmail(loginRequest.getEmail());
                response.put("message", "User is not verified. Please check your email for a verification link.");
                return ResponseEntity.status(401).body(response);
            case StatusCode.INCORRECT_PASSWORD:
                response.put("message", "Incorrect password. Please try again.");
                return ResponseEntity.status(401).body(response);
            default:
                response.put("message", "Authentication failed.");
                return ResponseEntity.status(401).body(response);
        }
    }

    // Login request 
    static class LoginRequest {
        private String email;
        private String password;

        // Getters and Setters
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
