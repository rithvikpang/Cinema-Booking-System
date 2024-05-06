package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(schema = "cinema_db", name = "ticket_price")
public class TicketPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer price_id;

    @Enumerated(EnumType.STRING)
    private TicketType ticketType;
    private Float price;

    public TicketPrice() {}

    public Integer getPriceId() {
        return price_id;
    }

    public void setPriceId(Integer priceId) {
        this.price_id = priceId;
    }

    public TicketType getTicketType() {
        return ticketType;
    }

    public void setTicketType(TicketType ticketType) {
        this.ticketType = ticketType;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

}
