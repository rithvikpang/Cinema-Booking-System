package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.dto.ShowRequest;
import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.Showroom;

import java.time.LocalDate;
import java.time.LocalTime;

public interface AdminService {
    Movie addMovie(Movie movie);
    Show scheduleShow(ShowRequest showRequest);
    boolean isShowroomBooked(Showroom showroom, LocalDate date, LocalTime time, int duration);
}
