package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(schema = "cinema_db", name ="credit_card")
public class PaymentCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int card_id;
    private String cardholder_name;
    private String card_number;
    private int expiry_month;
    private int expiry_year;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    public PaymentCard() {

    }

    public int getCardId() {
        return card_id;
    }

    public void setCardId(int card_id) {
        this.card_id = card_id;
    }

    public String getCardholderName() {
        return cardholder_name;
    }

    public void setCardholderName(String cardholder_name) {
        this.cardholder_name = cardholder_name;
    }

    public String getCardNumber() {
        return card_number;
    }

    public void setCardNumber(String card_number) {
        this.card_number = card_number;
    }

    public int getExpiryMonth() {
        return expiry_month;
    }

    public void setExpiryMonth(int expiry_month) {
        this.expiry_month = expiry_month;
    }

    public int getExpiryYear() {
        return expiry_year;
    }

    public void setExpiryYear(int expiry_year) {
        this.expiry_year = expiry_year;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
