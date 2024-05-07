package com.cinemabookingsystem.cinemadb.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.model.Seat;
import com.cinemabookingsystem.cinemadb.model.SeatStatus;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.Showroom;
import com.cinemabookingsystem.cinemadb.repository.SeatRepository;
import com.cinemabookingsystem.cinemadb.repository.SeatStatusRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowroomRepository;

@Service
public class SeatServiceImpl implements SeatService {
    
    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ShowroomRepository showroomRepository;

    @Autowired
    private SeatStatusRepository seatStatusRepository;

    @Autowired
    private ShowRepository showRepository;


    // administrative function to generate seats if a new showroom is added
    @Override
    public void generateSeats() {
        List<Showroom> showrooms = showroomRepository.findAll();
        for (Showroom showroom : showrooms) {
            if (shouldGenerateSeats(showroom)) {
                generateSeatsForShowroom(showroom);
            }
        }
    }

    @Override
    public void generateShowSeats() {
        List<Show> shows = showRepository.findAll();
        for (Show show : shows) {
            if (shouldGenerateShowSeats(show)) {
                generateSeatStatusesForShow(show);
            }
        }
    }

    @Override
    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    private void generateSeatsForShowroom(Showroom showroom) {
        int capacity = showroom.getCapacity();
        int seatsPerRow = 20; 
        int totalRows = (int) Math.ceil((double) capacity / seatsPerRow);

        for (int row = 0; row < totalRows; row++) {
            char rowLabel = (char) ('A' + row);
            for (int seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
                if (--capacity < 0) break; // Prevent creating extra seats
                Seat seat = new Seat();
                seat.setSeatNumber(seatNum);
                seat.setRowLetter(String.valueOf(rowLabel));
                seat.setShowroom(showroom);
                showroom.setSeats(seat);
                seatRepository.save(seat);
            }
        }
    }

    private void generateSeatStatusesForShow(Show show) {
        List<Seat> seats = show.getShowroom().getSeats();
        List<SeatStatus> seatStatuses = new ArrayList<>();
        for (Seat seat : seats) {
            SeatStatus seatStatus = new SeatStatus();
            seatStatus.setSeat(seat);
            seatStatus.setShow(show);
            seatStatus.setBooked(false);
            seatStatuses.add(seatStatus);
        }
        seatStatusRepository.saveAll(seatStatuses);
    }

    private boolean shouldGenerateShowSeats(Show show) {
        List<SeatStatus> currentShowSeats = seatStatusRepository.findByShow(show);
        return currentShowSeats.isEmpty();
    }

    private boolean shouldGenerateSeats(Showroom showroom) {
        return showroom.getSeats().isEmpty();
    }

    public Seat getSeatByShowroomRowLetterAndNumber(Showroom showroom, String row_letter, int seat_number) {
        return seatRepository.findByShowroomAndRowLetterAndSeatNumber(showroom, row_letter, seat_number)
                .orElseThrow(() -> new IllegalArgumentException("Seat not found"));
    }
}
