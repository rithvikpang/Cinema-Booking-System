package com.cinemabookingsystem.cinemadb.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.sql.Date;

@Entity
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String title;
    private String description;
    private int duration;
    private Date release_date;
    private int genre_id;
    private String image_url;
    private String director;
    private String cast;
    private String trailer_url;
    private String rating;
    

    // Constructors, Getters, and Setters
    public Movie() {

    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getTrailer_url() {
        return trailer_url;
    }

    public void setTrailer_url(String trailer_url) {
        this.trailer_url = trailer_url;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }
    
    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public String getCast() {
        return cast;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Date getRelease_date() {
        return release_date;
    }

    public void setRelease_date(Date release_date) {
        this.release_date = release_date;
    }

    public int getGenre_id() {
        return genre_id;
    }

    public void setGenre_id(int genre_id) {
        this.genre_id = genre_id;
    }


   
}
