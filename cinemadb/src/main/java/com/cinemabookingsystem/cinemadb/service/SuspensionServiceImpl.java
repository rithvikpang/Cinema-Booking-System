package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.model.Suspension;
import com.cinemabookingsystem.cinemadb.repository.SuspensionRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class SuspensionServiceImpl implements SuspensionService {

    @Autowired
    private SuspensionRepository suspensionRepository;

    @Override
    public List<Suspension> getActiveSuspensions() {
        LocalDate currentDate = LocalDate.now();
        return suspensionRepository.findByEndDateAfter(currentDate);
    }

    @Override
    public void createSuspension(Suspension suspension) {
        suspensionRepository.save(suspension);
    }

    @Override
    public void removeSuspension(Integer id) {
        suspensionRepository.deleteById(id);
    }
}