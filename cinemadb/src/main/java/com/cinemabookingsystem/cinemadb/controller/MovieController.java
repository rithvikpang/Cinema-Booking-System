package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.cinemabookingsystem.cinemadb.model.Genre;
import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.service.MovieService;

import java.security.InvalidParameterException;
import java.util.List;
import java.util.Set;
import java.time.LocalDate;


@RestController
@RequestMapping("/api/movies")
@CrossOrigin
@ComponentScan(basePackages = { "com.cinemabookingsystem.cinemadb.*" })
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/getAll")
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/search/by-title")
    public ResponseEntity<?> searchMovieByTitle(@RequestParam String title) {
        List<Movie> searchResults;
        try {
            searchResults = movieService.searchMoviesByTitle(title);
        } catch (InvalidParameterException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(searchResults);
    }

    @GetMapping("/search/by-genre")
    public ResponseEntity<?> searchMovieByGenre(@RequestParam Genre genre) {
        List<Movie> searchResults;
        try {
            searchResults = movieService.searchMoviesByGenre(genre);
        } catch (InvalidParameterException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(searchResults);
    }

    @GetMapping("search/by-show-date")
    public ResponseEntity<?> searchMoviesByShowDate(@RequestParam LocalDate showDate) {
        Set<Movie> searchResults;
        try { 
            searchResults = movieService.searchMoviesByShowDate(showDate);
        } catch (InvalidParameterException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok(searchResults);
    }


    
    


    // Add methods for GET by ID, PUT, and DELETE as needed
}
