package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.config.StatusCode;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * @Return SUCCESS if authentication is successful
     * @Return USER_NOT_VERIFIED if password is authenticated, but user is not verified
     * @Return INCORRECT_PASSWORD if the password is incorrct
     */
    @Override
    public int authenticate(String email, String rawPassword) {
        String hashedPassword = getHashedPassword(email);
        boolean isVerified = isUserVerified(email);
        int response = 0;
        if(passwordEncoder.matches(rawPassword, hashedPassword) 
            && isVerified) {
                response = StatusCode.SUCCESS;
        } else if ((passwordEncoder.matches(rawPassword, hashedPassword) 
            && !isVerified)) {
                response = StatusCode.USER_NOT_VERIFIED;
        } else if (!passwordEncoder.matches(rawPassword, hashedPassword)){
                response = StatusCode.INCORRECT_PASSWORD;
        }
        return response;
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
