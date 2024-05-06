package com.cinemabookingsystem.cinemadb.service;

import java.util.List;

import com.cinemabookingsystem.cinemadb.dto.BookingRequest;
import com.cinemabookingsystem.cinemadb.dto.SeatStatusDTO;
import com.cinemabookingsystem.cinemadb.model.Booking;

public interface BookingService {
    public Booking createBooking(BookingRequest bookingRequest);
    public List<SeatStatusDTO> getShowSeats(Integer showId); 
}
