package com.cinemabookingsystem.cinemadb.dto;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;

// DTO for Registration Requests
public class RegistrationRequest {
    
    private User user;
    private BillingAddress billingAddress;
    private PaymentCard paymentCard;
    
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
    public PaymentCard getPaymentCard() {
        return paymentCard;
    }
    public void setPaymentCard(PaymentCard paymentCard) {
        this.paymentCard = paymentCard;
    }
}
