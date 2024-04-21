package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(schema ="cinema_db", name = "genres")
public class Genre {
    
    @Id
    private Integer genre_id;
    private String name;

    public Genre() {
        
    }

    public Integer getGenreId() {
        return genre_id;
    }

    public void setGenreId(Integer genre_id) {
        this.genre_id = genre_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
