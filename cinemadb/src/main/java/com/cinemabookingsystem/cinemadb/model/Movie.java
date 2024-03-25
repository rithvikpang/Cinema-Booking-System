package com.cinemabookingsystem.cinemadb.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(schema = "cinema_db", name = "movies")
public class Movie {

    @Id
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration")
    private int duration;

    @Temporal(TemporalType.DATE)
    @Column(name = "release_date")
    private LocalDate release_date;

    @Column(name = "genre_id")
    private int genre_id;

    @Column(name = "rating", length = 5)
    private String rating;

    @Column(name = "category", length = 255)
    private String category;

    @Column(name = "cast")
    private String cast;

    @Column(name = "director", length = 255)
    private String director;

    @Column(name = "movie_image", length = 255)
    private String image_url;

    @Column(name = "movie_trailer", length = 255)
    private String trailer_url;

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

    public LocalDate getRelease_date() {
        return release_date;
    }

    public void setRelease_date(LocalDate release_date) {
        this.release_date = release_date;
    }

    public int getGenre_id() {
        return genre_id;
    }

    public void setGenre_id(int genre_id) {
        this.genre_id = genre_id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

}
