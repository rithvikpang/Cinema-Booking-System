package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(schema = "cinema_db", name = "booking")
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer booking_id;
    private int show_id;
    private int promotion_id;
    private int ticket_count;
    
    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    private User user;

    public Integer getBookingId() {
        return booking_id;
    }

    public void setBookingId(Integer booking_id) {
        this.booking_id = booking_id;
    }

    public int getShowId() {
        return show_id;
    }

    public void setShowId(int show_id) {
        this.show_id = show_id;
    }

    public int getPromotionId() {
        return promotion_id;
    }

    public void setPromotionId(int promotion_id) {
        this.promotion_id = promotion_id;
    }

    public int getTicketCount() {
        return ticket_count;
    }

    public void setTicketCount(int ticket_count) {
        this.ticket_count = ticket_count;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    
}
