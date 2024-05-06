package com.cinemabookingsystem.cinemadb.dto;

public class PaymentRequest {
    private Integer cardId;
    private String cardNumber;
    private Integer cvv;

    public PaymentRequest() {
        
    }
    public Integer getCardId() {
        return cardId;
    }

    public void setCardId(Integer cardId) {
        this.cardId = cardId;
    }
    public String getCardNumber() { 
        return cardNumber; 
    }
    public void setCardNumber(String cardNumber) 
    { 
        this.cardNumber = cardNumber; 
    }
    public Integer getCvv() 
    { 
        return cvv; 
    }
    public void setCvv(Integer cvv) 
    { 
        this.cvv = cvv; 
    }
}
