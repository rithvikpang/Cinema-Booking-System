package com.cinemabookingsystem.cinemadb.controller;

import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.service.MovieService;
import com.cinemabookingsystem.cinemadb.repository.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class MovieController {

    @Autowired
    private MovieService movieService;

    @Autowired
    private MovieRepository movieRepository;

    @PostMapping("/add")
    public String addMovie(@RequestBody Movie movie) {
        movieService.saveMovie(movie);
        return "Movie added successfuly";
    }

    @GetMapping("/getAll")
    public List<Movie> list() {
        return movieService.getAllMovies();
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(@RequestParam String term) {
        List<Movie> searchResults = movieRepository.findByTitleContainingIgnoreCase(term);
        return searchResults;
    }
    



    // Add methods for GET by ID, PUT, and DELETE as needed
}
