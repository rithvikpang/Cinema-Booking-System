package com.cinemabookingsystem.cinemadb.service;

import java.util.List;

import com.cinemabookingsystem.cinemadb.model.Seat;

public interface SeatService {
    void generateSeats();
    void generateShowSeats();
    List<Seat> getAllSeats();
}
