package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.dto.BookingRequest;
import com.cinemabookingsystem.cinemadb.model.Booking;

public interface BookingService {
    Booking createBooking(BookingRequest bookingRequest);
}
