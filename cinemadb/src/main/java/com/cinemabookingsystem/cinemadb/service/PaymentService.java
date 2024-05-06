package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.dto.PaymentRequest;

public interface PaymentService {
    public boolean authorizePayment(PaymentRequest paymentRequest);
}
