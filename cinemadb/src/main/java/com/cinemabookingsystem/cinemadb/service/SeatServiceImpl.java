package com.cinemabookingsystem.cinemadb.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.model.Seat;
import com.cinemabookingsystem.cinemadb.model.Showroom;
import com.cinemabookingsystem.cinemadb.repository.SeatRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowroomRepository;

@Service
public class SeatServiceImpl implements SeatService {
    
    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ShowroomRepository showroomRepository;

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

    private boolean shouldGenerateSeats(Showroom showroom) {
        return showroom.getSeats().isEmpty();
    }
}
