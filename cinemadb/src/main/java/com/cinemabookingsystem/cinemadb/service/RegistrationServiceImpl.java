package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;
import com.cinemabookingsystem.cinemadb.model.User;

import jakarta.transaction.Transactional;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Service
public class RegistrationServiceImpl implements RegistrationService {
    
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private MailServiceImpl mailService;

    // constructor autowired to pass in encoder instance
    public RegistrationServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void registerUser(User user, PaymentCard paymentCard, BillingAddress billingAddress, String url) {
        
        // Hashed password
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        user.setCreatedAt(Instant.now());

        // add payment card if given by user
        if(paymentCard != null) {
            Set<PaymentCard> newPaymentCardSet = new HashSet<>();
            paymentCard.setUser(user);
            newPaymentCardSet.add(paymentCard);
            user.setPaymentCards(newPaymentCardSet);
        }

        // add billing address if given
        if (billingAddress != null) {
            billingAddress.setUser(user);
            user.setBillingAddress(billingAddress);
        }

        userRepository.save(user);

        // send verification email
        mailService.sendVerificationEmail(user.getEmail(), url);
        
    }

    // hash password before storing
    @Override
    public String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    @SuppressWarnings("null")
    @Transactional
    @Override
    public void verifyUser(String email, String userId) {
        // convert generated id to integer for db storage
        int userIdAsInt = Integer.parseInt(userId);
        User user = userRepository.findById(email).orElseThrow();
        user.setIsVerified(true);
        user.setUserId(userIdAsInt);
        userRepository.save(user);
    }

    // verify password
}
