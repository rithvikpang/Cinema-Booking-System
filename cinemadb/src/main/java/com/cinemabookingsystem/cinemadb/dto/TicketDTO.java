package com.cinemabookingsystem.cinemadb.dto;

import java.math.BigDecimal;

import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TicketDTO {
    private Integer seatId;
    private BigDecimal price;

    public TicketDTO() {}
    
    public Integer getSeatId() {
        return seatId;
    }
    public void setSeatId(Integer seatId) {
        this.seatId= seatId;
    }
    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
}
