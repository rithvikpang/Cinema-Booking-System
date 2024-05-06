package com.cinemabookingsystem.cinemadb.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TicketDTO {
    private Integer seatId;
    private Float price;

    public TicketDTO() {}
    
    public Integer getSeatId() {
        return seatId;
    }
    public void setSeatId(Integer seatId) {
        this.seatId= seatId;
    }
    public Float getPrice() {
        return price;
    }
    public void setPrice(Float price) {
        this.price = price;
    }
    
}
