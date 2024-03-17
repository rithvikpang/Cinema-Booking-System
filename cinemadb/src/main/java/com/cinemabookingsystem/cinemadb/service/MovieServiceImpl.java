package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.repository.MovieRepository;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieService {
    
    @Autowired
    private MovieRepository movieRepository;

    @SuppressWarnings("null")
    @Override
    public Movie saveMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @Query
    @Override
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @Override
    public List<Movie> searchMovies(String term) {
        return movieRepository.findByTitleContainingIgnoreCase(term);
    }
}
