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
import com.cinemabookingsystem.cinemadb.dto.LoginRequest;

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

    // @PostMapping("/login")
    // public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    //     int isAuthenticated = authenticationService.authenticate(
    //             loginRequest.getEmail(), loginRequest.getPassword());

    //     Map<String, Object> response = new HashMap<>();
    //     if (isAuthenticated == StatusCode.SUCCESS) {
    //         response.put("message", "Authentication successful");
    //         return ResponseEntity.ok(response);
    //     } else if(isAuthenticated == StatusCode.USER_NOT_VERIFIED) {
    //         mailService.sendVerificationEmail(loginRequest.getEmail(), siteUrl);
    //         response.put("message", "Authentication failed, user must verify email before logging in, new verification email sent");
    //         return ResponseEntity.status(401).body(response);
    //     } else if(isAuthenticated == StatusCode.INCORRECT_PASSWORD) {
    //         response.put("message", "Authentication failed, incorrect password");
    //         return ResponseEntity.status(401).body(response);
    //     } else {
    //         response.put("message", "Authentication failed");
    //         return ResponseEntity.status(401).body(response);
    //     }
    // }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(loginRequest.getEmail());
        int authenticationResult = authenticationService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        Map<String, Object> response = new HashMap<>();
        switch (authenticationResult) {
            case StatusCode.SUCCESS:
                String jwtToken = authenticationService.generateToken(userDetails);
                response.put("message", "Authentication successful");
                response.put("token", jwtToken);
                return ResponseEntity.ok(response);
            case StatusCode.USER_NOT_VERIFIED:
                mailService.sendVerificationEmail(loginRequest.getEmail(), siteUrl);
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
}
