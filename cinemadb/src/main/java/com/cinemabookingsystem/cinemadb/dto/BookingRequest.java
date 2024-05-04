package com.cinemabookingsystem.cinemadb.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingRequest {

    private int showId;
    private String promotionCode;
   
    private int ticketCount;
    private String userEmail;
    private int paymentCardId;
    
    public int getShowId() {
        return showId;
    }
    public void setShowId(int showId) {
        this.showId = showId;
    }
    public int getTicketCount() {
        return ticketCount;
    }
    public void setTicketCount(int ticketCount) {
        this.ticketCount = ticketCount;
    }
    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    public int getPaymentCardId() {
        return paymentCardId;
    }
    public void setPaymentCardId(int paymentCardId) {
        this.paymentCardId = paymentCardId;
    }
    public String getPromotionCode() {
        return promotionCode;
    }
    public void setPromotionCode(String promotionCode) {
        this.promotionCode = promotionCode;
    }
}
