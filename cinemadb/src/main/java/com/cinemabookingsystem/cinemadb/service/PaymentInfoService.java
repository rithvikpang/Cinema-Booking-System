package com.cinemabookingsystem.cinemadb.service;

import java.util.Set;

import com.cinemabookingsystem.cinemadb.dto.PaymentCardDTO;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;

public interface PaymentInfoService {
    public Set<PaymentCardDTO> getUserPaymentCards(String email);
    public BillingAddress getUserBillingAddress(String email);
    public PaymentCardDTO addPaymentCard(PaymentCardDTO newPaymentCardDTO, String email);
    public BillingAddress addOrUpdateBillingAddress(BillingAddress billingAddress, String email);
    public PaymentCardDTO editPaymentCard(PaymentCardDTO paymentCardDTO, Integer cardId);
    public void removePaymentCard(Integer cardId);
    public void removeBillingAddress(String email);
}
