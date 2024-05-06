package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.web.bind.annotation.RestController;

import com.cinemabookingsystem.cinemadb.dto.BookingRequest;
import com.cinemabookingsystem.cinemadb.dto.SeatStatusDTO;
import com.cinemabookingsystem.cinemadb.model.Booking;
import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.cinemabookingsystem.cinemadb.service.BookingServiceImpl;
import com.cinemabookingsystem.cinemadb.service.PaymentServiceImpl;
import com.cinemabookingsystem.cinemadb.service.TicketPriceServiceImpl;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/booking")
public class BookingController {
    
    @Autowired
    private BookingServiceImpl bookingService;

    @Autowired
    private PaymentServiceImpl paymentService;

    @Autowired
    private TicketPriceServiceImpl ticketPriceService;

    @Transactional
    @PostMapping("/create-booking")
    public ResponseEntity<?> createBooking(@Validated @RequestBody BookingRequest bookingRequest, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        if (!paymentService.authorizePayment(bookingRequest.getPaymentRequest())) {
            return ResponseEntity.badRequest().body("Unable to authorize payment");
        } 
        Booking newBooking = bookingService.createBooking(bookingRequest);
        return ResponseEntity.ok().body(newBooking);
    }
    
    @GetMapping("/get-show-seats/{showId}")
    public ResponseEntity<?> getShowSeats(@PathVariable Integer showId) {
        List<SeatStatusDTO> showSeats = new ArrayList<>();
        try {
            showSeats = bookingService.getShowSeats(showId);
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().body(showSeats);
    }

    @GetMapping("/get-ticket-price/{ticketType}")
    public ResponseEntity<?> getTicketPrice(@PathVariable TicketType ticketType) {
        Float price;
        try {
            price = ticketPriceService.getPriceByTicketType(ticketType);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().body(price);
    }

    @PostMapping("/create-booking-test")
    public ResponseEntity<?> createBooking(@RequestBody String rawJson) {
        System.out.println("Booking Request: ");
        System.out.println(rawJson);
        // Deserialize manually for debugging
        return ResponseEntity.ok("Check logs for raw JSON");
    }  

    
    
}
