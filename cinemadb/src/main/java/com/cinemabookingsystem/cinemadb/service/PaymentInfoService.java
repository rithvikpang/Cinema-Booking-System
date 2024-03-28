package com.cinemabookingsystem.cinemadb.service;

import java.util.Set;

import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;

public interface PaymentInfoService {
    public Set<PaymentCard> getUserPaymentCards(String email);
    public BillingAddress getUserBillingAddress(String email);
    public PaymentCard addPaymentCard(PaymentCard newPaymentCard, String email);
    public BillingAddress addOrUpdateBillingAddress(BillingAddress billingAddress, String email);
    public PaymentCard editPaymentCard(PaymentCard paymentCard, Integer cardId);
    public void removePaymentCard(Integer cardId);
    public void removeBillingAddress(String email);
}
