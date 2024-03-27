package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;

public interface PaymentInfoService {
    public PaymentCard addPaymentCard(PaymentCard newPaymentCard, String email);
    public BillingAddress addOrUpdateBillingAddress(BillingAddress billingAddress, String email);
    public PaymentCard editPaymentCard(PaymentCard paymentCard, Integer cardId);
}
