package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.PaymentCard;

import java.util.Optional;
import java.util.Set;

@Repository
public interface PaymentCardRepository extends JpaRepository<PaymentCard, Integer> {
    Set<PaymentCard> findByUserEmail(String email);
    Optional<PaymentCard> findByCardNumber(String cardNumber);
}
