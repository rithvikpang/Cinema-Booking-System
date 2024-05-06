package com.cinemabookingsystem.cinemadb.dto;

import java.math.BigDecimal;

import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TicketPriceDTO {
    private TicketType ticketType;
    private BigDecimal newPrice;
    
    public TicketPriceDTO() {
        
    }

    public TicketType getTicketType() {
        return ticketType;
    }
    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }
    public BigDecimal getNewPrice() {
        return newPrice;
    }
    public void setNewPrice(BigDecimal newPrice) {
        this.newPrice = newPrice;
    }
}
