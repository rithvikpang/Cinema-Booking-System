package com.cinemabookingsystem.cinemadb.controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import com.cinemabookingsystem.cinemadb.security.JwtUtil;
import com.cinemabookingsystem.cinemadb.service.CustomUserDetailsService;
import com.cinemabookingsystem.cinemadb.service.PaymentInfoServiceImpl;
import com.cinemabookingsystem.cinemadb.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import java.security.Principal;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("api/user")
public class UserController {
    
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private PaymentInfoServiceImpl paymentInfoService;

    @GetMapping("{email}/get-payment-cards")
    public Set<PaymentCard> getPaymentCards(@PathVariable String email, Errors errors) {
        return paymentInfoService.getUserPaymentCards(email);
    }

    @GetMapping("{email}/get-billing-address")
    public BillingAddress getBillingAddress(@PathVariable String email, Errors errors) {
        return paymentInfoService.getUserBillingAddress(email);
    }
    
    @PostMapping("{email}/add-payment-card")
    public ResponseEntity<?> addPaymentCard(@PathVariable String email,
        @Validated @RequestBody PaymentCard newPaymentCard, 
        Errors errors) {
            if (errors.hasErrors()) {
            // Return a bad request with the validation errors
            return ResponseEntity.badRequest().body(errors.getAllErrors());
            }
            paymentInfoService.addPaymentCard(newPaymentCard, email);
        return ResponseEntity.ok().body("Payment card added successfully");
    }

    @PostMapping("{email}/add-or-update-billing-address")
    public ResponseEntity<?> addOrUpdateBillingAddress(@Validated @RequestBody BillingAddress billingAddress, 
        @PathVariable String email,
        Errors errors) {
        
            if (errors.hasErrors()) {
            // Return a bad request with the validation errors
            return ResponseEntity.badRequest().body(errors.getAllErrors());
            }
        paymentInfoService.addOrUpdateBillingAddress(billingAddress, email);
        return ResponseEntity.ok().body("Updated billing address successfully");
    }

    @PutMapping("edit-payment-card/{cardId}")
    public ResponseEntity<?> editPaymentCard(@PathVariable Integer cardId,
        @Validated @RequestBody PaymentCard paymentCard,
        Errors errors) {
                if (errors.hasErrors()) {
                // Return a bad request with the validation errors
                return ResponseEntity.badRequest().body(errors.getAllErrors());
                }
            paymentInfoService.editPaymentCard(paymentCard, cardId);
            return ResponseEntity.ok().body("Payment Card modified successfully");
        }

    @DeleteMapping("delete-payment-card/{cardId}")
    public ResponseEntity<?> deletePaymentCard(@PathVariable Integer cardId) {
        paymentInfoService.removePaymentCard(cardId);
        return ResponseEntity.ok().body("Payment Card deleted successfully");
    }

    @DeleteMapping("delete-billing-address/{email}")
    public ResponseEntity<?> deleteBillingAddress(@PathVariable String email) {
        paymentInfoService.removeBillingAddress(email);
        return ResponseEntity.ok().body("Billing Address deleted successfully");
    }

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    // Endpoint to get user profile information
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        String token = getTokenFromRequest(request);
        if (token != null && !jwtUtil.isTokenExpired(token)) {
            String email = jwtUtil.getUsernameFromToken(token);
            logger.info("Email extracted from token: " + email);

            User user = userRepository.findById(email).orElse(null);
            if (user != null) {
                // Consider creating a DTO to return user information
                return ResponseEntity.ok().body(user);
            }
        }
        return ResponseEntity.notFound().build();
    }

private String getTokenFromRequest(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
        return bearerToken.substring(7); // Extract the token by removing "Bearer "
    }
    return null; // Return null if the token is not found or doesn't start with "Bearer "
}


    // Endpoint to update user profile information
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User updatedUser, Errors errors) {
        if (errors.hasErrors()) {
            // Return a bad request with the validation errors
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        String token = getTokenFromRequest(request);
        if (token != null && !jwtUtil.isTokenExpired(token)) {
            String email = jwtUtil.getUsernameFromToken(token);
            User currentUser = userRepository.findById(email).orElse(null);

            if (currentUser != null) {
                // Update the necessary fields
                currentUser.setFirstname(updatedUser.getFirstname());
                currentUser.setLastname(updatedUser.getLastname());
                // Do not update the email field as it should not be modified
                // Update other fields but exclude email and password
                
                // Save the updated user back to the database
                userRepository.save(currentUser);

                // Return a successful response
                return ResponseEntity.ok().body("Profile updated successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        return ResponseEntity.badRequest().body("Invalid or expired token");
    }
    

}

