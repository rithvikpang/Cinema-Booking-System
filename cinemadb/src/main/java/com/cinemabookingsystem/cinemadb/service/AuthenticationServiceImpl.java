package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.config.StatusCode;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;

import io.jsonwebtoken.Jwts;

import java.util.*;

import javax.crypto.SecretKey;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    public AuthenticationServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * @Return SUCCESS if authentication is successful
     * @Return USER_NOT_VERIFIED if password is authenticated, but user is not
     *         verified
     * @Return INCORRECT_PASSWORD if the password is incorrct
     */
    // @Override
    // public int authenticate(String email, String rawPassword) {
    // String hashedPassword = getHashedPassword(email);
    // boolean isVerified = isUserVerified(email);
    // int response = 0;
    // if(passwordEncoder.matches(rawPassword, hashedPassword)
    // && isVerified) {
    // response = StatusCode.SUCCESS;
    // } else if ((passwordEncoder.matches(rawPassword, hashedPassword)
    // && !isVerified)) {
    // response = StatusCode.USER_NOT_VERIFIED;
    // } else if (!passwordEncoder.matches(rawPassword, hashedPassword)){
    // response = StatusCode.INCORRECT_PASSWORD;
    // }
    // return response;
    // }

    @SuppressWarnings("null")
    @Override
    public int authenticate(String email, String rawPassword) {
        UserDetails userDetails;
        try {
            userDetails = customUserDetailsService.loadUserByUsername(email);
        } catch (UsernameNotFoundException e) {
            return StatusCode.USER_NOT_FOUND;
        }

        User customUser = userRepository.findById(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        boolean isPasswordMatch = passwordEncoder.matches(rawPassword, userDetails.getPassword());
        boolean isVerified = customUser.isVerified();

        if (isPasswordMatch && isVerified) {
            return StatusCode.SUCCESS;
        } else if (isPasswordMatch) {
            return StatusCode.USER_NOT_VERIFIED;
        } else {
            return StatusCode.INCORRECT_PASSWORD;
        }
    }

    @Autowired
    private SecretKey jwtSecretKey;

    public String generateToken(UserDetails userDetails) {
        long now = System.currentTimeMillis();
        Map<String, Object> claims = new HashMap<>();

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(grantedAuthority -> "ROLE_ADMIN".equals(grantedAuthority.getAuthority()));

        claims.put("isAdmin", isAdmin); // Add isAdmin to the claims

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + 1000 * 60 * 60)) // 1 hour validity
                .signWith(jwtSecretKey) // Use a proper secret key
                .compact();
    }

    // private method to getHashedPassword for security
    @SuppressWarnings("null")
    private String getHashedPassword(String email) {
        User user = userRepository.findById(email).orElseThrow();
        return user.getPassword();
    }

    @SuppressWarnings("null")
    private boolean isUserVerified(String email) {
        User user = userRepository.findById(email).orElseThrow();
        return user.isVerified();
    }

}
