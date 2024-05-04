package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Set;

@Entity
@Table(schema = "cinema_db", name = "showroom")
public class Showroom {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer showroom_id;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theater_id", referencedColumnName = "theater_id")
    private Theater theater;

    @OneToMany(mappedBy = "showroom", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Seat> seats;

    private int capacity;

    public Showroom() {
        
    }

    public Integer getShowroomId() {
        return showroom_id;
    }

    public void setShowroomId(Integer showroom_id) {
        this.showroom_id = showroom_id;
    }

    public Theater getTheater() {
        return theater;
    }

    public void setTheater(Theater theater) {
        this.theater = theater;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Set<Seat> getSeats() {
        return seats;
    }

    public void setSeats(Seat seat) {
        this.seats.add(seat);
    }

}
