package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinemabookingsystem.cinemadb.model.Genre;
import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.repository.GenreRepository;
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
    private GenreRepository genreRepository;

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
        List<Movie> movies = movieRepository.findByTitleContainingIgnoreCase(title);
        // check to see if list is empty
        if (movies.isEmpty()) {
            throw new InvalidParameterException("No movies found matching: " + title);
        }
        for(Movie m : movies) {
            System.out.println(m.getShows().size());
        }
        return movies;
    }

    @Override
    public List<Movie> searchMoviesByGenre(String genreName) {
        Optional<Genre> match = genreRepository.findByName(genreName);
        // error if genre is not found
        if (!match.isPresent()) {
            throw new InvalidParameterException("Genre: " + genreName + " is not valid");    
        }
        // get movie by genre id
        Genre genre = match.get();
        List<Movie> movies = movieRepository.findByGenreId(genre.getGenreId());
        // error if no movies match genre
        if (movies.isEmpty()) {
            throw new InvalidParameterException("No movies found with genre: " + genreName);
        }
        return movies;
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
