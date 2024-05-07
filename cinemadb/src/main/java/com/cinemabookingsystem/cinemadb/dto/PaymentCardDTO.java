package com.cinemabookingsystem.cinemadb.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PaymentCardDTO {
    private String cardholder_name;
    private String card_number;
    private int expiry_month;
    private int expiry_year;
    private String zip_code;
    private Integer cvv;

    public PaymentCardDTO() {

    }

    //public PaymentCardDTO(PaymentCard paymentCard) {
        //this.cardholder_name = paymentCard.getCardholderName();
        //this.card_number = paymentCard.getCardNumber();
       // this.expiry_month = paymentCard.getExpiryMonth();
        //this.expiry_year = paymentCard.getExpiryYear();
        //this.zip_code = paymentCard.getZipCode();
       // this.cvv = paymentCard.getCvv();
    //}

    public String getCardholderName() {
        return cardholder_name;
    }
    public void setCardholderName(String cardholerName) {
        this.cardholder_name = cardholerName;
    }
    public String getCardNumber() {
        return card_number;
    }
    public void setCardNumber(String cardNumber) {
        this.card_number = cardNumber;
    }
    public int getExpiryMonth() {
        return expiry_month;
    }
    public void setExpiryMonth(int expiryMonth) {
        this.expiry_month = expiryMonth;
    }
    public int getExpiryYear() {
        return expiry_year;
    }
    public void setExpiryYear(int expiryYear) {
        this.expiry_year = expiryYear;
    }
    public String getZipCode() {
        return zip_code;
    }
    public void setZipCode(String zipCode) {
        this.zip_code = zipCode;
    }
    public Integer getCvv() {
        return cvv;
    }
    public void setCvv(Integer cvv) {
        this.cvv = cvv;
    }
}
