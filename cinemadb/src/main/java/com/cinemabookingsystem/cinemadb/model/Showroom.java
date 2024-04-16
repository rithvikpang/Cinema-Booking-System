package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

@Entity
@Table(schema = "cinema_db", name = "showroom")
public class Showroom {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer showroom_id;

    @OneToMany(mappedBy = "showroom")
    private Set<Show> shows; 

    @ManyToOne
    @JoinColumn(name = "theater_id", referencedColumnName = "theater_id")
    private Theater theater;

    private int capacity;

    public Showroom() {
        
    }

    public Integer getShowroomId() {
        return showroom_id;
    }

    public void setShowroomId(Integer showroom_id) {
        this.showroom_id = showroom_id;
    }

    public Set<Show> getShows() {
        return shows;
    }

    public void setShows(Set<Show> shows) {
        this.shows = shows;
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

}
