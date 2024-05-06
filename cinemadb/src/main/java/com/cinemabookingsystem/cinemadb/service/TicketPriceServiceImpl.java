package com.cinemabookingsystem.cinemadb.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.dto.TicketPriceDTO;
import com.cinemabookingsystem.cinemadb.model.TicketPrice;
import com.cinemabookingsystem.cinemadb.model.TicketType;
import com.cinemabookingsystem.cinemadb.repository.TicketPriceRepository;

@Service
public class TicketPriceServiceImpl implements TicketPriceService {
    
    @Autowired
    private TicketPriceRepository ticketPriceRepository;

    @Override
    public BigDecimal getPriceByTicketType(TicketType ticketType) {
        return ticketPriceRepository.findByTicketType(ticketType)
                .orElseThrow(() -> new IllegalArgumentException("No price defined for category: " + ticketType))
                .getPrice();
    }

    @Override
    public TicketPrice setTicketPrice(TicketPriceDTO ticketPriceDTO) {
        TicketType ticketType = ticketPriceDTO.getTicketType();
        BigDecimal newPrice = ticketPriceDTO.getNewPrice();
        
        TicketPrice ticketPrice = ticketPriceRepository.findByTicketType(ticketType)
                .orElse(new TicketPrice());
        ticketPrice.setTicketType(ticketType);
        ticketPrice.setPrice(newPrice);
        return ticketPriceRepository.save(ticketPrice);
    }
}
