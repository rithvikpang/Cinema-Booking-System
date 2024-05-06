package com.cinemabookingsystem.cinemadb.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderDTO {
    private String movieTitle;
    private Integer ticketCount;
    private List<TicketDTO> tickets;
    private String showDate;
    private String showTime; 

    public OrderDTO(){

    }
    public String getMovieTitle() {
        return movieTitle;
    }
    public void setMovieTitle(String movieTitle) {
        this.movieTitle = movieTitle;
    }
    public Integer getTicketCount() {
        return ticketCount;
    }
    public void setTicketCount(Integer ticketCount) {
        this.ticketCount = ticketCount;
    }
    public List<TicketDTO> getTickets() {
        return tickets;
    }
    public void setTickets(List<TicketDTO> tickets) {
        this.tickets = tickets;
    }
    public String getShowDate() {
        return showDate;
    }
    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }
    public String getShowTime() {
        return showTime;
    }
    public void setShowTime(String showTime) {
        this.showTime = showTime;
    }
}
