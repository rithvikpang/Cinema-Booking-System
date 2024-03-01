package com.cinemabookingsystem.cinemadb.controller;

import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.service.MovieService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("api/movies")
@CrossOrigin
public class MovieController {

    @Autowired
    private MovieService movieService;


    @PostMapping("/add")
    public String addMovie(@RequestBody Movie movie) {
        movieService.saveMovie(movie);
        return "Movie added successfuly";
    }

    @GetMapping("/getAll")
    public List<Movie> list() {
        return movieService.getAllMovies();
    }
    



    // Add methods for GET by ID, PUT, and DELETE as needed
}
