package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

@Entity
@Table(schema = "cinema_db", name = "theater")
public class Theater {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer theater_id;

    private String location;

    @OneToMany(mappedBy = "theater")
    private Set<Showroom> showrooms;
    
    public Integer getTheaterId() {
        return theater_id;
    }

    public void setTheaterId(Integer theater_id) {
        this.theater_id = theater_id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Set<Showroom> getShowrooms() {
        return showrooms;
    }

    public void setShowrooms(Set<Showroom> showrooms) {
        this.showrooms = showrooms;
    }
}
