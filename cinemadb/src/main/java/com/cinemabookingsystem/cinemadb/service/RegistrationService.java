package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;

public interface RegistrationService {
    public void registerUser(User user, PaymentCard paymentCard, BillingAddress billingAddress, String url);
    public void verifyUser(String email, String userId);
    public String hashPassword(String rawPassword);
}
