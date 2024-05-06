package com.cinemabookingsystem.cinemadb.dto;

import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SeatStatusDTO {
    private Integer showId;
    private Integer seatId;
    private String rowLetter;
    private Integer seatNumber;
    private Boolean isBooked;
    private TicketType ticketType;

    public SeatStatusDTO() {}

    public Integer getShowId() {
        return showId;
    }

    public void setShowId(Integer showId) {
        this.showId = showId;
    }

    public Integer getSeatId() {
        return seatId;
    }

    public void setSeatId(Integer seatId) {
        this.seatId = seatId;
    }

    public String getRowLetter() {
        return rowLetter;
    }

    public void setRowLetter(String rowLetter) {
        this.rowLetter = rowLetter;
    }

    public Integer getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(Integer seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Boolean isBooked() {
        return isBooked;
    }

    public void setIsBooked(Boolean isBooked) {
        this.isBooked = isBooked;
    }

    public TicketType getTicketType() {
        return ticketType;
    }

    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }
    
}
