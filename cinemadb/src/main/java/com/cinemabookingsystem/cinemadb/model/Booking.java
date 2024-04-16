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
    
    @ManyToOne
    @JoinColumn(name = "show_id", referencedColumnName = "show_id")
    private Show show;

    @ManyToOne
    @JoinColumn(name = "promotion_id", referencedColumnName = "promotion_id")
    private Promotion promotion;

    private int ticket_count;
    
    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email")
    private User user;

    @ManyToOne
    @JoinColumn(name = "card_id", referencedColumnName = "card_id")
    private PaymentCard paymentCard;

    public Booking() {

    }

    public Integer getBookingId() {
        return booking_id;
    }

    public void setBookingId(Integer booking_id) {
        this.booking_id = booking_id;
    }

    public Show getShow() {
        return show;
    }

    public void setShow(Show show) {
        this.show = show;
    }

    public Promotion getPromotion() {
        return promotion;
    }

    public void setPromotion(Promotion promotion) {
        this.promotion = promotion;
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

    public PaymentCard getPaymentCard() {
        return paymentCard;
    }

    public void setPaymentCard(PaymentCard paymentCard) {
        this.paymentCard = paymentCard;
    }
    
}
