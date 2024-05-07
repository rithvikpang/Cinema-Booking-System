package com.cinemabookingsystem.cinemadb.service;

import java.util.List;

import com.cinemabookingsystem.cinemadb.model.Seat;
import com.cinemabookingsystem.cinemadb.model.Showroom;

public interface SeatService {
    void generateSeats();
    void generateShowSeats();
    List<Seat> getAllSeats();
    Seat getSeatByShowroomRowLetterAndNumber(Showroom showroom, String row_letter, int seat_number);
}
