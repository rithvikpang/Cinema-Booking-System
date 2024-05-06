package com.cinemabookingsystem.cinemadb.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(schema = "cinema_db", name ="credit_card")
public class PaymentCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer card_id;
    private String cardholder_name;
    
    @Column(name = "card_number")
    private String cardNumber;
    private int expiry_month;
    private int expiry_year;
    private String zip_code;
    private Integer cvv;

    @JsonBackReference("user-paymentcard")
    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    public PaymentCard() {

    }

    public Integer getCardId() {
        return card_id;
    }

    public void setCardId(Integer card_id) {
        this.card_id = card_id;
    }

    public String getCardholderName() {
        return cardholder_name;
    }

    public void setCardholderName(String cardholder_name) {
        this.cardholder_name = cardholder_name;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
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

    public String getZipCode() {
        return zip_code;
    }

    public void setZipCode(String zip_code) {
        this.zip_code = zip_code;
    }

    public Integer getCvv() {
        return cvv;
    }

    public void setCvv(Integer cvv) {
        this.cvv = cvv;
    }
}
