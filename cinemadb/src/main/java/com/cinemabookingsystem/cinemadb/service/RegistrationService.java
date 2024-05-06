package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.dto.PaymentCardDTO;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;

public interface RegistrationService {
    public void registerUser(User user, PaymentCardDTO newPaymentCardDTO, BillingAddress billingAddress, String url);
    public void verifyUser(String email, String userId);
    public String hashPassword(String rawPassword);
}
