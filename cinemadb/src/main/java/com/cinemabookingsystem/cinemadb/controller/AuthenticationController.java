package com.cinemabookingsystem.cinemadb.controller;

import java.util.HashMap;
import java.util.List;
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
import com.cinemabookingsystem.cinemadb.service.SuspensionService;
import com.cinemabookingsystem.cinemadb.config.StatusCode;
import com.cinemabookingsystem.cinemadb.dto.LoginRequest;
import com.cinemabookingsystem.cinemadb.model.Suspension;

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

    @Autowired
    private SuspensionService suspensionService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);

        // Check if user is suspended
        List<Suspension> activeSuspensions = suspensionService.getActiveSuspensions();
        for (Suspension suspension : activeSuspensions) {
            if (suspension.getEmail().equalsIgnoreCase(email)) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "User is currently suspended.");
                return ResponseEntity.status(403).body(response); // Forbidden
            }
        }

        int authenticationResult = authenticationService.authenticate(email, loginRequest.getPassword());
        Map<String, Object> response = new HashMap<>();
        switch (authenticationResult) {
            case StatusCode.SUCCESS:
                String jwtToken = authenticationService.generateToken(userDetails);
                response.put("message", "Authentication successful");
                response.put("token", jwtToken);
                return ResponseEntity.ok(response);
            case StatusCode.USER_NOT_VERIFIED:
                mailService.sendVerificationEmail(email, siteUrl);
                response.put("message", "User is not verified. Please check your email for a verification link.");
                return ResponseEntity.status(401).body(response); // Unauthorized
            case StatusCode.INCORRECT_PASSWORD:
                response.put("message", "Incorrect password. Please try again.");
                return ResponseEntity.status(401).body(response); // Unauthorized
            default:
                response.put("message", "Authentication failed.");
                return ResponseEntity.status(401).body(response); // Unauthorized
        }
    }
}
