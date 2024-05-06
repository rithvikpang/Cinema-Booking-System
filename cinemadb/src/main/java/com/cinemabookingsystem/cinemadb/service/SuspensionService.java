package com.cinemabookingsystem.cinemadb.service;

import java.util.List;

import com.cinemabookingsystem.cinemadb.model.Suspension;

public interface SuspensionService {
    List<Suspension> getActiveSuspensions();
    void createSuspension(Suspension suspension);
    void removeSuspension(Integer id);
}
