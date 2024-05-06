package com.cinemabookingsystem.cinemadb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cinemabookingsystem.cinemadb.dto.SuspensionRequest;
import com.cinemabookingsystem.cinemadb.model.Suspension;
import com.cinemabookingsystem.cinemadb.service.SuspensionService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SuspensionController {

    @Autowired
    private SuspensionService suspensionService;

    @GetMapping("/suspensions")
    public ResponseEntity<List<Suspension>> getActiveSuspensions() {
        List<Suspension> activeSuspensions = suspensionService.getActiveSuspensions();
        return ResponseEntity.ok(activeSuspensions);
    }

    @PostMapping("/suspend")
    public ResponseEntity<Void> suspendUser(@RequestBody SuspensionRequest suspensionRequest) {
        Suspension suspension = new Suspension();
        suspension.setEmail(suspensionRequest.getEmail());
        suspension.setReason(suspensionRequest.getReason());
        suspension.setStartDate(suspensionRequest.getStartDate());
        suspension.setEndDate(suspensionRequest.getEndDate());

        suspensionService.createSuspension(suspension);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/suspend/{id}")
    public ResponseEntity<Void> removeSuspension(@PathVariable Integer id) {
        suspensionService.removeSuspension(id);
        return ResponseEntity.ok().build();
    }
}
