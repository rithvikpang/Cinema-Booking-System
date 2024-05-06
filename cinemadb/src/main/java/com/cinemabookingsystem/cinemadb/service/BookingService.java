package com.cinemabookingsystem.cinemadb.service;

import java.util.Set;

import com.cinemabookingsystem.cinemadb.dto.BookingRequest;
import com.cinemabookingsystem.cinemadb.model.Booking;
import com.cinemabookingsystem.cinemadb.model.SeatStatus;

public interface BookingService {
    public Booking createBooking(BookingRequest bookingRequest);
    public Set<SeatStatus> getShowSeats(Integer showId); 
}
