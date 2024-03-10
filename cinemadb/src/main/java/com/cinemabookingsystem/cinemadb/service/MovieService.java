package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.Movie;

import java.util.List;

public interface MovieService {
    public Movie saveMovie(Movie movie);
    public List<Movie> getAllMovies();
    public List<Movie> searchMovies(String term);
}
