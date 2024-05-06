package com.cinemabookingsystem.cinemadb.service;

import java.math.BigDecimal;

import com.cinemabookingsystem.cinemadb.dto.TicketPriceDTO;
import com.cinemabookingsystem.cinemadb.model.TicketPrice;
import com.cinemabookingsystem.cinemadb.model.TicketType;

public interface TicketPriceService {
    public BigDecimal getPriceByTicketType(TicketType ticketType);
    public TicketPrice setTicketPrice(TicketPriceDTO TicketPriceDTO);
}