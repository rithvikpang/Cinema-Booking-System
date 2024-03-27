package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(schema = "cinema_db", name ="credit_card=")
public class PaymentCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int card_id;
    private String email;
    private String cadholder_name;
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
    
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCadholderName() {
        return cadholder_name;
    }

    public void setCadholderName(String cadholder_name) {
        this.cadholder_name = cadholder_name;
    }

    public int getExpiryMonth() {
        return expiry_month;
    }

    public void setExpiryMoth(int expiry_month) {
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
