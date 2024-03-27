package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;
import com.cinemabookingsystem.cinemadb.service.PaymentInfoServiceImpl;

import java.util.Set;

@RestController
@RequestMapping("api/user")
public class UserController {
    
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
}

