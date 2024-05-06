package com.cinemabookingsystem.cinemadb.service;

import java.math.BigDecimal;

import com.cinemabookingsystem.cinemadb.model.TicketType;

public interface TicketService {
    BigDecimal getPriceByTicketType(TicketType ticketType);
}
