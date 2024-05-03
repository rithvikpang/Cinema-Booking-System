package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.dto.ShowRequest;
import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.model.Promotion;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.Showroom;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface AdminService {
    Movie addMovie(Movie movie);
    Movie editMovie(Integer movieId, Movie movie);
    void deleteMovie(Integer movieId);
    Show scheduleShow(ShowRequest showRequest);
    boolean isShowroomBooked(Showroom showroom, LocalDate date, LocalTime time, int duration);
    Promotion createPromotion(Promotion promotion);
    List<Promotion> getAllPromotions();
    Optional<Promotion> getPromotionById(Integer id);
    Promotion updatePromotion(Integer id, Promotion updatedPromotion);
    void deletePromotion(Integer id);
    void sendPromotionEmails();
}
