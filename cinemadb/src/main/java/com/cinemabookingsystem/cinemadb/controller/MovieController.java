package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;

import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.repository.MovieRepository;
import com.cinemabookingsystem.cinemadb.service.MovieService;

import java.util.List;


@RestController
@RequestMapping("/api/movies")
@CrossOrigin
@ComponentScan(basePackages = { "com.cinemabookingsystem.cinemadb.*" })
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping("/getAll")
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String term) {
        List<Movie> searchResults = movieRepository.findByTitleContainingIgnoreCase(term);
        return searchResults;
    }
    
    


    // Add methods for GET by ID, PUT, and DELETE as needed
}
