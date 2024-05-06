package com.cinemabookingsystem.cinemadb.dto;

import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TicketPriceDTO {
    private TicketType ticketType;
    private Float newPrice;
    
    public TicketPriceDTO() {
        
    }

    public TicketType getTicketType() {
        return ticketType;
    }
    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }
    public Float getNewPrice() {
        return newPrice;
    }
    public void setNewPrice(Float newPrice) {
        this.newPrice = newPrice;
    }
}
