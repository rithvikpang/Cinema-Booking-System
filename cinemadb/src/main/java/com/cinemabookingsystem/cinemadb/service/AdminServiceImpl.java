package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.dto.ShowRequest;
import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.Showroom;
import com.cinemabookingsystem.cinemadb.repository.MovieRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowroomRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

@Service
public class AdminServiceImpl implements AdminService {


    @Autowired
    private ShowRepository showRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private ShowroomRepository showroomRepository;
    
    @SuppressWarnings("null")
    @Override
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public Show scheduleShow(ShowRequest showRequest) {
        // Get movie
        Movie movie = movieRepository.findById(showRequest.getMovieId())
            .orElseThrow(() -> new IllegalArgumentException("Movie not found with id: " 
                + showRequest.getMovieId()));
        // Get showroom
        Showroom showroom = showroomRepository.findById(showRequest.getShowroomId())
            .orElseThrow(() -> new IllegalArgumentException("Showroom not found with id: " 
            + showRequest.getShowroomId()));
        // duration of movie to check times
        int duration = movie.getDuration();
        // return error if showroom is booked
        if(isShowroomBooked(showroom, showRequest.getDate(),
            showRequest.getTime(), duration)) {
                throw new IllegalArgumentException("This showroom is booked at: " + showRequest.getTime());
            }
        // Construct show and set fields
        Show show = new Show();
        show.setDate(showRequest.getDate());
        show.setTime(showRequest.getTime());
        show.setDuration(duration);
        show.setMoive(movie);
        show.setShowroom(showroom);
        // add this show to the showroom's set of shows
        showroom.setShow(show);
        return show; 
    }

    @Override
    public boolean isShowroomBooked(Showroom showroom, LocalDate date, LocalTime time, int duration) {
        boolean isShowroomBooked = false;
        // Set of shows on this date and in this showroom
        Set<Show> shows = showRepository.findByDateAndShowroom(date, showroom);
        // If there are no shows, return
        if(shows == null) {
            return isShowroomBooked;
        }
        // Duration of movie, plus 30 minutes to allow for transition between shows
        LocalTime endTime = time.plusMinutes(duration + 30);
        // loop over shows for this date in this showroom
        for(Show show : shows) {
            // if desired show time is booked, return
            if(time.compareTo(show.getTime()) >= 0 
                && show.getTime().compareTo(endTime) <= 0 ) {
                    isShowroomBooked = true;
                    return isShowroomBooked;
                }
        }
        return isShowroomBooked;
        }






}
