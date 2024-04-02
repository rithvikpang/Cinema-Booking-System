package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.cinemabookingsystem.cinemadb.dto.RegistrationRequest;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.service.RegistrationServiceImpl;



@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    @Autowired
    private RegistrationServiceImpl registrationService;

    public final String siteUrl = "http://localhost:8080/api/registration";

    @PostMapping
    public ResponseEntity<?> registerUser(@Validated @RequestBody RegistrationRequest registrationRequest, Errors errors) {
        if (errors.hasErrors()) {
            // Return a bad request with the validation errors
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        User user = registrationRequest.getUser();
        PaymentCard paymentCard = registrationRequest.getPaymentCard();
        BillingAddress billingAddress = registrationRequest.getBillingAddress();

        user.setStatus("Inactive");
        registrationService.registerUser(user, paymentCard, billingAddress, siteUrl);
        return ResponseEntity.ok().body("{\"message\":\"User registered successfully\"}");
    }

    @GetMapping("/verify")
    public String verifyUser(@RequestParam String email, @RequestParam String code) {
        // code is set to new userId once verified
        registrationService.verifyUser(email, code);
        return "User verfied successfully";
    }
    
}
