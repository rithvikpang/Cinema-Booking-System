package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinemabookingsystem.cinemadb.model.Genre;
import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.repository.MovieRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowRepository;

import java.security.InvalidParameterException;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class MovieServiceImpl implements MovieService {
    
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ShowRepository showRepository;

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
    public List<Movie> searchMoviesByTitle(String title) {
        List<Movie> moviesByThisTitle = movieRepository.findByTitleContainingIgnoreCase(title);
        // check to see if list is empty
        if (moviesByThisTitle.isEmpty()) {
            throw new InvalidParameterException("No movies found matching: " + title);
        }
        return moviesByThisTitle;
    }

    @Override
    public List<Movie> searchMoviesByGenre(Genre genre) {
       List<Movie> moviesByThisGenre = movieRepository.findByGenre(genre);
       // checks to see if list is empty
       if (moviesByThisGenre.isEmpty()) {
        throw new InvalidParameterException("No movies with genre: " + genre);
       }
       return moviesByThisGenre;
    }

    @Override
    public Set<Movie> searchMoviesByShowDate(LocalDate showDate) {
        Set<Show> showsOnThisDate = showRepository.findByDate(showDate);
        // error if no shows on this date
        if (showsOnThisDate.isEmpty()) {
            throw new InvalidParameterException("No shows on date: " + showDate.toString());
        }
        // get all movies on this date, ensuring no duplicates by using Set
        Set<Movie> moviesOnThisDate = new HashSet<>();
        for (Show show : showsOnThisDate) {
            moviesOnThisDate.add(show.getMovie());
        }
        return moviesOnThisDate;
    }
}
