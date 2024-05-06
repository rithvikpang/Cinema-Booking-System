package com.cinemabookingsystem.cinemadb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cinemabookingsystem.cinemadb.model.Ticket;
import java.util.List;
import com.cinemabookingsystem.cinemadb.model.TicketType;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer>{
    
}
