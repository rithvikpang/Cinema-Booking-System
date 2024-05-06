package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.TicketPrice;
import com.cinemabookingsystem.cinemadb.model.TicketType;

import java.util.Optional;


@Repository
public interface TicketPriceRepository extends JpaRepository<TicketPrice, Integer> {
    Optional<TicketPrice> findByTicketType(TicketType ticketType);
}
