package com.cinemabookingsystem.cinemadb.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemabookingsystem.cinemadb.service.AuthenticationServiceImpl;
import com.cinemabookingsystem.cinemadb.service.MailServiceImpl;
import com.cinemabookingsystem.cinemadb.util.JwtUtil;
import com.cinemabookingsystem.cinemadb.config.StatusCode;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationServiceImpl authenticationService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private MailServiceImpl mailService;

    public final String siteUrl = "http://localhost:8080/api/registration";

    public AuthenticationController(AuthenticationServiceImpl authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        int isAuthenticated = authenticationService.authenticate(
                loginRequest.getEmail(), loginRequest.getPassword());

        Map<String, Object> response = new HashMap<>();
        if (isAuthenticated == StatusCode.SUCCESS) {
            // Upon successful authentication, generate the JWT token
            final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
            final String jwt = jwtUtil.generateToken(userDetails);

            response.put("message", "Authentication successful");
            response.put("jwt", jwt); // Add the token to the response
            return ResponseEntity.ok(response);
        }  else if(isAuthenticated == StatusCode.USER_NOT_VERIFIED) {
            mailService.sendVerificationEmail(loginRequest.getEmail(), siteUrl);
            response.put("message", "Authentication failed, user must verify email before logging in, new verification email sent");
            return ResponseEntity.status(401).body(response);
        } else if(isAuthenticated == StatusCode.INCORRECT_PASSWORD) {
            response.put("message", "Authentication failed, incorrect password");
            return ResponseEntity.status(401).body(response);
        } else {
            response.put("message", "Authentication failed");
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
