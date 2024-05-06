package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(schema = "cinema_db", name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private Integer movie_id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration")
    private int duration;

    @Temporal(TemporalType.DATE)
    @Column(name = "release_date")
    private LocalDate release_date;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('COMEDY', 'DRAMA', 'ACTION', 'ROMANCE', 'ADVENTURE', 'HORROR')")
    private Genre genre;

    @Column(name = "rating", length = 5)
    private String rating;

    @Column(name = "category", length = 255)
    private String category;

    @Column(name = "cast")
    private String cast;

    @Column(name = "director", length = 255)
    private String director;

    @Column(name = "movie_image", length = 255)
    private String movie_image;

    @Column(name = "movie_trailer", length = 255)
    private String movie_trailer;

    @Column(name = "producer", length = 255)
    private String producer;

    @Column(name = "reviews", length = 255)
    private String reviews;

    @JsonManagedReference
    @OneToMany(mappedBy = "movie", cascade = CascadeType.REFRESH)
    private Set<Show> shows;

    // Constructors, Getters, and Setters
    public Movie() {

    }

    public String getImageUrl() {
        return movie_image;
    }

    public void setImageUrl(String movie_image) {
        this.movie_image = movie_image;
    }

    public String getTrailerUrl() {
        return movie_trailer;
    }

    public void setTrailerUrl(String movie_trailer) {
        this.movie_trailer = movie_trailer;
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

    public LocalDate getReleaseDate() {
        return release_date;
    }

    public void setReleaseDate(LocalDate release_date) {
        this.release_date = release_date;
    }

    public Genre getGenre() {
        return genre;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProducer() {
        return producer;
    }

    public void setProducer(String producer) {
        this.producer = producer;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }

    public Set<Show> getShows() {
        return shows;
    }

    public void setShow(Show show) {
        this.shows.add(show);
    }

    public Integer getMovieId() {
        return movie_id;
    }

    public void setMovieId(Integer movie_id) {
        this.movie_id = movie_id;
    }



}
