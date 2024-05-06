package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.dto.PaymentCardDTO;
import com.cinemabookingsystem.cinemadb.model.BillingAddress;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.BillingAddressRepository;
import com.cinemabookingsystem.cinemadb.repository.PaymentCardRepository;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import com.cinemabookingsystem.cinemadb.util.CardEncrypter;

import jakarta.transaction.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PaymentInfoServiceImpl implements PaymentInfoService {
    
    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @Autowired
    private BillingAddressRepository billingAddressRepository;

    @Autowired
    private UserRepository userRepository;

    // get all payment cards associated with a given user
    @SuppressWarnings("null")
    @Override
    public Set<PaymentCardDTO> getUserPaymentCards(String email) {
        User user = userRepository.findById(email)
            .orElseThrow(() -> new IllegalStateException("User not found with email: " + email));
        Set<PaymentCard> existingCards = user.getPaymentCards();

        for (PaymentCard card : existingCards) {
            card.setCardNumber(decryptCard(card.getCardNumber()));
        }
        return existingCards.stream()
            .map(paymentCard -> {
                PaymentCardDTO paymentCardDTO = new PaymentCardDTO();
                paymentCardDTO.setCardNumber(paymentCard.getCardNumber());
                paymentCardDTO.setCardholderName(paymentCard.getCardholderName());
                paymentCardDTO.setCvv(paymentCard.getCvv());
                paymentCardDTO.setExpiryMonth(paymentCard.getExpiryMonth());
                paymentCardDTO.setExpiryYear(paymentCard.getExpiryYear());
                return paymentCardDTO;
            })
            .collect(Collectors.toSet());
    }

    // get the billing address associated with a given user
    @SuppressWarnings("null")
    @Override
    public BillingAddress getUserBillingAddress(String email) {
        User user = userRepository.findById(email).orElseThrow();
        return user.getBillingAddress();
    }
    
    // add payment info from edit card
    @SuppressWarnings("null")
    @Transactional
    @Override
    public PaymentCardDTO addPaymentCard(PaymentCardDTO newPaymentCardDTO, String email) {
        User user = userRepository.findById(email)
            .orElseThrow(() -> new IllegalStateException("User does not exist"));
        
        Set<PaymentCard> existingCards = paymentCardRepository.findByUserEmail(email);
        // ensures the user does not already have 3 payment cards
        if (existingCards.size() >= 3) {
            throw new IllegalStateException("User cannot have more than 3 payment cards");
        }
        System.out.println(newPaymentCardDTO.getCardholderName());
        PaymentCard newPaymentCard = new PaymentCard();
        newPaymentCard.setCardNumber(encryptCard(newPaymentCardDTO.getCardNumber()));
        newPaymentCard.setCardholderName(newPaymentCardDTO.getCardholderName());
        newPaymentCard.setExpiryMonth(newPaymentCardDTO.getExpiryMonth());
        newPaymentCard.setExpiryYear(newPaymentCardDTO.getExpiryYear());
        newPaymentCard.setUser(user);
        newPaymentCard.setCvv(newPaymentCardDTO.getCvv());
        newPaymentCard.setZipCode(newPaymentCardDTO.getZipCode());
        paymentCardRepository.save(newPaymentCard);
        return newPaymentCardDTO;
    }

    // add billing address
    @SuppressWarnings("null")
    @Transactional
    @Override
    public BillingAddress addOrUpdateBillingAddress(BillingAddress billingAddress, String email) {
        User user = userRepository.findById(email).orElseThrow();
        if (user == null) {
            throw new IllegalStateException("User does not exist");
        }
        BillingAddress existingBillingAddress = billingAddressRepository.findByUserEmail(email);
        // if the user has not previously set a billing address
        if (existingBillingAddress == null) {
            billingAddress.setUser(user);
            return billingAddressRepository.save(billingAddress);
        } else {
            existingBillingAddress.setAddressLine(billingAddress.getAddressLine());
            existingBillingAddress.setCity(billingAddress.getCity());
            existingBillingAddress.setState(billingAddress.getState());
            existingBillingAddress.setCountry(billingAddress.getCountry());
            existingBillingAddress.setZipCode(billingAddress.getZipCode());
            return billingAddressRepository.save(existingBillingAddress);
        }
    }

    // edit payment cards
    @SuppressWarnings("null")
    @Transactional
    @Override
    public PaymentCardDTO editPaymentCard(PaymentCardDTO paymentCardDTO, Integer cardId) {
            PaymentCard existingCard = paymentCardRepository.findById(cardId)
                .orElseThrow(() -> new IllegalStateException("Payment card not found"));

            // set fields of updated card
            existingCard.setCardholderName(paymentCardDTO.getCardholderName());
            existingCard.setCardNumber(encryptCard(paymentCardDTO.getCardNumber()));
            existingCard.setExpiryMonth(paymentCardDTO.getExpiryMonth());
            existingCard.setExpiryYear(paymentCardDTO.getExpiryYear());
            existingCard.setZipCode(paymentCardDTO.getZipCode());
            existingCard.setCvv(paymentCardDTO.getCvv());
            paymentCardRepository.save(existingCard);
            return paymentCardDTO;
    }

    // remove payment card
    @SuppressWarnings("null")
    @Override
    @Transactional
    public void removePaymentCard(Integer cardId) {
        PaymentCard deletedCard = paymentCardRepository.findById(cardId).orElseThrow();
        paymentCardRepository.delete(deletedCard);
    }

    // remove billing address
    @SuppressWarnings("null")
    @Override
    @Transactional
    public void removeBillingAddress(String email) {
        BillingAddress deletedAddress = billingAddressRepository.findByUserEmail(email);
        billingAddressRepository.delete(deletedAddress);
    }

    private String encryptCard(String cardNumber) {
        String encryptedCardNumber;
        try {
            encryptedCardNumber = CardEncrypter.encrypt(cardNumber);
        } catch (Exception e) {
            encryptedCardNumber = null;
            e.printStackTrace();
        }
        return encryptedCardNumber;
    }

    private String decryptCard(String encryptedCardNumber) {
        String decryptedCardNumber;
        try {
            decryptedCardNumber = CardEncrypter.decrypt(encryptedCardNumber);
        } catch (Exception e) {
            decryptedCardNumber = null;
            e.printStackTrace();
        }
        return decryptedCardNumber;
    }

}
