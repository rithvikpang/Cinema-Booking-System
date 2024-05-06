package com.cinemabookingsystem.cinemadb.dto;

import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TicketDTO {
    private Integer seat_id;
    private TicketType ticketType;
    
    public TicketDTO() {}
    
    public Integer getSeatId() {
        return seat_id;
    }
    public void setSeatId(Integer seat_id) {
        this.seat_id = seat_id;
    }
    public TicketType getTicketType() {
        return ticketType;
    }
    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }
}
