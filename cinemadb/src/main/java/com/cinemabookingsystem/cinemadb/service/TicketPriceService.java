package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.dto.TicketPriceDTO;
import com.cinemabookingsystem.cinemadb.model.TicketPrice;
import com.cinemabookingsystem.cinemadb.model.TicketType;

public interface TicketPriceService {
    public Float getPriceByTicketType(TicketType ticketType);
    public TicketPrice setTicketPrice(TicketPriceDTO TicketPriceDTO);
}