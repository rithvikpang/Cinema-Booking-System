package com.cinemabookingsystem.cinemadb.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingRequest {

    private Integer showId;
    private String promotionCode;
    private int ticketCount;
    private String userEmail;
    private List<SeatStatusDTO> seatStatusDTOs;
    private PaymentRequest paymentRequest;
    private Float totalPrice;

    public BookingRequest() {

    }
    
    public Integer getShowId() {
        return showId;
    }
    public void setShowId(Integer showId) {
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
    public String getPromotionCode() {
        return promotionCode;
    }
    public void setPromotionCode(String promotionCode) {
        this.promotionCode = promotionCode;
    }
    public List<SeatStatusDTO> getSeatStatusDTOs() {
        return seatStatusDTOs;
    }
    public void setSeatStatusDTOs(List<SeatStatusDTO> seatStatusDTOs) {
        this.seatStatusDTOs = seatStatusDTOs;
    }
    public PaymentRequest getPaymentRequest() {
        return paymentRequest;
    }
    public void setPaymentRequest(PaymentRequest paymentRequest) {
        this.paymentRequest = paymentRequest;
    }
    public Float getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }
}
