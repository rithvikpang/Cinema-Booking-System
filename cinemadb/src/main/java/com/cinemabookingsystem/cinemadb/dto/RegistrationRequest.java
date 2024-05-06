package com.cinemabookingsystem.cinemadb.dto;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;

// DTO for Registration Requests
public class RegistrationRequest {
    
    private User user;
    private BillingAddress billingAddress;
    private PaymentCardDTO paymentCardDTO;
    
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public BillingAddress getBillingAddress() {
        return billingAddress;
    }
    public void setBillingAddress(BillingAddress billingAddress) {
        this.billingAddress = billingAddress;
    }
    public PaymentCardDTO getPaymentCardDTO() {
        return paymentCardDTO;
    }
    public void setPaymentCardDTO(PaymentCardDTO paymentCardDTO) {
        this.paymentCardDTO = paymentCardDTO;
    }
}
