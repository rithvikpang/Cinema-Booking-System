package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(schema = "cinema_db", name = "seat")
public class Seat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer seat_id;
    private String row;
    private int seat_number;

    @ManyToOne
    @JoinColumn(name = "showroom_id", referencedColumnName = "showroom_id")
    private Showroom showroom;

    public Integer getSeatId() {
        return seat_id;
    }

    public void setSeatId(Integer seat_id) {
        this.seat_id = seat_id;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row;
    }

    public int getSeatNumber() {
        return seat_number;
    }

    public void setSeatNumber(int seat_number) {
        this.seat_number = seat_number;
    }

    public Showroom getShowroom() {
        return showroom;
    }

    public void setShowroom(Showroom showroom) {
        this.showroom = showroom;
    }
}
