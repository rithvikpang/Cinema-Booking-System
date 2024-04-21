package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.Movie;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface MovieService {
    public Movie saveMovie(Movie movie);
    public List<Movie> getAllMovies();
    public List<Movie> searchMoviesByTitle(String title);
    public List<Movie> searchMoviesByGenre(String genreName);
    public Set<Movie> searchMoviesByShowDate(LocalDate showDate);
}
