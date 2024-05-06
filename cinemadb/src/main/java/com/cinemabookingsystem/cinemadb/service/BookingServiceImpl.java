package com.cinemabookingsystem.cinemadb.service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.dto.BookingRequest;
import com.cinemabookingsystem.cinemadb.model.Booking;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;
import com.cinemabookingsystem.cinemadb.model.Promotion;
import com.cinemabookingsystem.cinemadb.model.SeatStatus;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.Ticket;
import com.cinemabookingsystem.cinemadb.model.TicketPrice;
import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.BookingRepository;
import com.cinemabookingsystem.cinemadb.repository.PaymentCardRepository;
import com.cinemabookingsystem.cinemadb.repository.PromotionRepository;
import com.cinemabookingsystem.cinemadb.repository.SeatStatusRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowRepository;
import com.cinemabookingsystem.cinemadb.repository.TicketPriceRepository;
import com.cinemabookingsystem.cinemadb.repository.TicketRepository;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowRepository showRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    @Autowired
    private TicketRepository ticketRepository; 

    @Autowired
    private TicketPriceServiceImpl ticketPriceService;

    @Autowired
    private SeatStatusRepository seatStatusRepository;

    @Override
    public Booking createBooking(BookingRequest bookingRequest) {
        Show show = showRepository.findById(bookingRequest.getShowId())
            .orElseThrow(() -> new IllegalStateException("Error fetching show"));
        User user = userRepository.findById(bookingRequest.getUserEmail())
            .orElseThrow(() -> new IllegalStateException("Error fetching show"));
        Promotion promotion = new Promotion();
            // if no promotion code is used ignore
        if (bookingRequest.getPromotionCode() != null) {
            Optional<Promotion> isValidPromotionCode = promotionRepository
                .findByCode(bookingRequest.getPromotionCode());
            // if code is valid
            if(isValidPromotionCode.isPresent()) {
                promotion = isValidPromotionCode.get();
            } else {
                throw new IllegalStateException("Invalid promotion code");
            }
        }
        return new Booking();
    }

    @Override
    public Set<SeatStatus> getShowSeats(Integer showId) {
        Show show = showRepository.findById(showId)
            .orElseThrow(() -> new IllegalStateException("No show found with id: " + showId));
        return seatStatusRepository.findByShow(show);    
    }
    
}
