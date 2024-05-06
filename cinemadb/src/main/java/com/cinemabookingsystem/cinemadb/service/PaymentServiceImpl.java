package com.cinemabookingsystem.cinemadb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.dto.PaymentRequest;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;
import com.cinemabookingsystem.cinemadb.repository.PaymentCardRepository;
import com.cinemabookingsystem.cinemadb.util.CardEncrypter;

@Service
public class PaymentServiceImpl implements PaymentService {
    
    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @Override
    public boolean authorizePayment(PaymentRequest paymentRequest) {
        Optional<PaymentCard> cardOpt = paymentCardRepository
            .findByCardNumber(CardEncrypter.encrypt(paymentRequest.getCardNumber())); 
        // if card with card number is found 
        if (cardOpt.isPresent()) {
            if (cardOpt.get().getCvv().equals(paymentRequest.getCvv())) {
                return true;
            } 
        }
        return false;
    }
}
