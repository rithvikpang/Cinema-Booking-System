package com.cinemabookingsystem.cinemadb.service;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.dto.BookingRequest;
import com.cinemabookingsystem.cinemadb.dto.SeatStatusDTO;
import com.cinemabookingsystem.cinemadb.dto.TicketDTO;
import com.cinemabookingsystem.cinemadb.model.Booking;
import com.cinemabookingsystem.cinemadb.model.PaymentCard;
import com.cinemabookingsystem.cinemadb.model.Promotion;
import com.cinemabookingsystem.cinemadb.model.Seat;
import com.cinemabookingsystem.cinemadb.model.SeatStatus;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.Ticket;
import com.cinemabookingsystem.cinemadb.model.TicketPrice;
import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.BookingRepository;
import com.cinemabookingsystem.cinemadb.repository.PaymentCardRepository;
import com.cinemabookingsystem.cinemadb.repository.PromotionRepository;
import com.cinemabookingsystem.cinemadb.repository.SeatRepository;
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
    @Autowired
    private SeatRepository seatRepository;
    @Autowired 
    private PaymentServiceImpl paymentService;
    @Autowired
    private MailServiceImpl mailService;

    @Override
    public Booking createBooking(BookingRequest bookingRequest) {
        Booking newBooking = new Booking();
        Show show = showRepository.findById(bookingRequest.getShowId())
            .orElseThrow(() -> new IllegalStateException("Error fetching show"));
        User user = userRepository.findById(bookingRequest.getUserEmail())
            .orElseThrow(() -> new IllegalStateException("Error fetching user"));
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
        // get card
        PaymentCard paymentCard = paymentCardRepository
            .findById(bookingRequest.getPaymentRequest().getCardId())
            .orElseThrow(() -> new IllegalStateException("No matching card found to save to booking"));
        // generate tickets from dtos
        List<Ticket> tickets = generateTickets(bookingRequest.getSeatStatusDTOs(), show);
        // set new booking fields
        newBooking.setUser(user);
        newBooking.setShow(show);
        newBooking.setPromotion(promotion);
        newBooking.setTicketCount(bookingRequest.getTicketCount());
        newBooking.setPaymentCard(paymentCard);
        newBooking.setTickets(tickets);
        newBooking.setTotalPrice(bookingRequest.getTotalPrice());
        for (Ticket ticket : tickets) {
            ticket.setBooking(newBooking);
            ticketRepository.save(ticket);
        }
        user.getBookings().add(newBooking);
        mailService.sendBookingConfirmationEmail(user, newBooking);
        return bookingRepository.save(newBooking);
    }

    @Override
    public List<SeatStatusDTO> getShowSeats(Integer showId) {
        Show show = showRepository.findById(showId)
            .orElseThrow(() -> new IllegalStateException("No show found with id: " + showId));
        List<SeatStatus> showSeats = seatStatusRepository.findByShow(show);
        List<SeatStatusDTO> showSeatsDTOS = new ArrayList<>();
        for (SeatStatus seatStatus : showSeats) {
            SeatStatusDTO seatStatusDTO = new SeatStatusDTO();
            seatStatusDTO.setShowId(showId);
            seatStatusDTO.setSeatId(seatStatus.getSeat().getSeatId());
            seatStatusDTO.setRowLetter(seatStatus.getSeat().getRowLetter());
            seatStatusDTO.setSeatNumber(seatStatus.getSeat().getSeatNumber());
            seatStatusDTO.setIsBooked(seatStatus.isBooked());
            showSeatsDTOS.add(seatStatusDTO);
        } 
        return showSeatsDTOS;  
    }

    // generates tickets and marks seats as booked
    private List<Ticket> generateTickets(List<SeatStatusDTO> seatStatusDTOs, Show show) {
        if (seatStatusDTOs.isEmpty()) {
            throw new IllegalStateException("No tickets to generate");
        }
        List<Ticket> tickets = new ArrayList<>();
        for (SeatStatusDTO seatStatusDTO : seatStatusDTOs) {
            Ticket ticket = new Ticket();
            Optional<Seat> seatOpt = seatRepository.findById(seatStatusDTO.getSeatId());
            if(seatOpt.isPresent()) {
                Seat seat = seatOpt.get();
                List<SeatStatus> seatStatuses = seatStatusRepository.findBySeat(seat);
                // match seat to show
                SeatStatus matchedSeatStatus = new SeatStatus();
                for (SeatStatus seatStatus : seatStatuses) {
                    if (seatStatus.getShow().equals(show)) {
                        matchedSeatStatus = seatStatus;
                        break;
                    }
                }
                ticket.setSeat(seat);
                ticket.setTicketType(seatStatusDTO.getTicketType());
                matchedSeatStatus.setBooked(true);
                seatStatusRepository.save(matchedSeatStatus);
            } else {
                throw new IllegalStateException("No seat matching seat id: " + seatStatusDTO.getSeatId());
            }          
            tickets.add(ticket);
        }
        return tickets;
    }
    
}
