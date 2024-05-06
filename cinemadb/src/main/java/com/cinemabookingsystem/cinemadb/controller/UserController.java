package com.cinemabookingsystem.cinemadb.controller;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinemabookingsystem.cinemadb.dto.OrderDTO;
import com.cinemabookingsystem.cinemadb.dto.PaymentCardDTO;
import com.cinemabookingsystem.cinemadb.dto.UserDTO;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import com.cinemabookingsystem.cinemadb.security.JwtUtil;
import com.cinemabookingsystem.cinemadb.service.PaymentInfoServiceImpl;
import com.cinemabookingsystem.cinemadb.service.UserServiceImpl;

import jakarta.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.slf4j.Logger;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("api/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    @Autowired
    private PaymentInfoServiceImpl paymentInfoService;

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("{email}/get-payment-cards")
    public ResponseEntity<?> getPaymentCards(@PathVariable String email) {
        Set<PaymentCardDTO> cards;
        try {
            cards = paymentInfoService.getUserPaymentCards(email);
        } catch(IllegalStateException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().body(cards);
    }

    @GetMapping("{email}/get-billing-address")
    public BillingAddress getBillingAddress(@PathVariable String email, Errors errors) {
        return paymentInfoService.getUserBillingAddress(email);
    }

    @PostMapping("{email}/add-payment-card")
    public ResponseEntity<?> addPaymentCard(@PathVariable String email,
            @Validated @RequestBody PaymentCardDTO newPaymentCardDTO,
            Errors errors) {
        if (errors.hasErrors()) {
            // Return a bad request with the validation errors
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        paymentInfoService.addPaymentCard(newPaymentCardDTO, email);
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
            @Validated @RequestBody PaymentCardDTO paymentCardDTO,
            Errors errors) {
        PaymentCardDTO editedCard;
        if (errors.hasErrors()) {
            // Return a bad request with the validation errors
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        try {
            editedCard = paymentInfoService.editPaymentCard(paymentCardDTO, cardId);
        } catch(IllegalStateException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().body(editedCard);
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

    //@Autowired
   // private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private HttpServletRequest request;

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsersEndpoint() {
        List<UserDTO> userDTOs = userService.getAllUsers();
        return ResponseEntity.ok(userDTOs);
    }

    @GetMapping("/profile/{email}")
    public ResponseEntity<?> getUserProfileByEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            UserDTO userDTO = userService.convertToUserDTO(user); // Convert User to UserDTO
            return ResponseEntity.ok().body(userDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to get user profile information
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        String token = getTokenFromRequest(request);
        if (token != null && !jwtUtil.isTokenExpired(token)) {
            String email = jwtUtil.getUsernameFromToken(token);
            logger.info("Email extracted from token: " + email);

            User user = userRepository.findById(email).orElse(null);
            if (user != null) {
                UserDTO userDTO = userService.convertToUserDTO(user); 
                return ResponseEntity.ok().body(userDTO);
            }
        }
        return ResponseEntity.notFound().build();
    }

    // get user order history
    @GetMapping("/order-history")
    public ResponseEntity<?> getUserOrderHistory() {
        String token = getTokenFromRequest(request);
        if (token != null && !jwtUtil.isTokenExpired(token)) {
            String email = jwtUtil.getUsernameFromToken(token);
            logger.info("Email extracted from token: " + email);
            List<OrderDTO> orders = userService.getUserOrderHistory(email);
            return ResponseEntity.ok().body(orders);
        }
        return ResponseEntity.notFound().build();
    }
    

    @PutMapping("/profile/{email}")
    public ResponseEntity<?> updateUserProfileByEmail(@PathVariable String email,
                                                    @RequestBody User updatedUser,
                                                    Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null) {
            userService.updateUser(updatedUser, email);
            return ResponseEntity.ok().body("Profile updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
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
            userService.updateUser(updatedUser, email);
            return ResponseEntity.ok().body("Profile updated successfully");
        }
        return ResponseEntity.badRequest().body("Invalid or expired token");
    }

    @DeleteMapping("/profile/{email}")
    public ResponseEntity<?> deleteUserProfile(@PathVariable("email") String email) {
        try {
            userService.deleteUserProfile(email);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user profile.");
        }
    }

    // @PostMapping("{email}/forgot-password")
    // public ResponseEntity<?> forgotPassword(@RequestParam String email) {
    // User user = userService.getUserByEmail(email);
    // if (user != null) {
    // userService.sendVerificationCode(user);
    // return ResponseEntity.ok().body("Verification code sent to email");
    // }
    // return ResponseEntity.badRequest().body("User not found");
    // }

    // @PostMapping("/verify-code")
    // public ResponseEntity<?> verifyCode(@RequestParam String code) {
    // if (userService.validateVerificationCode(code)) {
    // return ResponseEntity.ok().body("Code is valid");
    // }
    // return ResponseEntity.badRequest().body("Invalid code");
    // }

    // @PostMapping("/reset-password")
    // public ResponseEntity<?> resetPassword(@RequestParam String email,
    // @RequestParam String newPassword) {
    // try {
    // boolean isPasswordReset = userService.resetPassword(email, newPassword);
    // if (!isPasswordReset) {
    // return ResponseEntity.badRequest().body("Password reset failed");
    // }
    // return ResponseEntity.ok().body("Password reset successfully");
    // } catch (Exception e) {
    // return ResponseEntity.badRequest().body("Error resetting password");
    // }
    // }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {

        userService.forgotPassword(email);
        return ResponseEntity.ok().body("Verification code sent to email");

    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {

        boolean result = userService.resetPassword(token, newPassword);
        if (result) {
            return ResponseEntity.ok().body("Password reset successfully");
        }
        return ResponseEntity.badRequest().body("Error resetting password");

    }

}
