package com.cinemabookingsystem.cinemadb.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cinemabookingsystem.cinemadb.dto.ShowRequest;
import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.model.Promotion;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.service.AdminServiceImpl;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("api/admin")
public class AdminController {

    @Autowired
    private AdminServiceImpl adminService;

    @PostMapping("/add-movie")
    public ResponseEntity<?> addMovie(@Validated @RequestBody Movie movie, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        adminService.addMovie(movie);
        return ResponseEntity.ok().body("Movie added successfully");
    }

    @PutMapping("/edit-movie/{movieId}")
    public ResponseEntity<?> editMovie(@Validated @RequestBody Movie movie, 
        @PathVariable Integer movieId, Errors errors) {
        // new movie to return
        Movie updatedMovie = new Movie();
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        try {
            updatedMovie = adminService.editMovie(movieId, movie);
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
    }

    @PostMapping("/schedule-show")
    public ResponseEntity<?> scheduleShow(@Validated @RequestBody ShowRequest showRequest, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }
        // catch error from service layer
        try {
            adminService.scheduleShow(showRequest);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().body("Successfully scheduled show");
    }

    @PostMapping("/add-promotion")
    public ResponseEntity<Promotion> createPromotion(@RequestBody Promotion promotion) {
        Promotion createdPromotion = adminService.createPromotion(promotion);
        adminService.sendPromotionEmails();
        return new ResponseEntity<>(createdPromotion, HttpStatus.CREATED);
    }

    @GetMapping("/promotions")
    public ResponseEntity<List<Promotion>> getAllPromotions() {
        List<Promotion> promotions = adminService.getAllPromotions();
        return new ResponseEntity<>(promotions, HttpStatus.OK);
    }

    @GetMapping("/promotions/{id}")
    public ResponseEntity<?> getPromotionById(@PathVariable Integer id) {
        Optional<Promotion> promotionOptional = adminService.getPromotionById(id);
        if (promotionOptional.isPresent()) {
            return ResponseEntity.ok(promotionOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/promotions/{id}")
    public ResponseEntity<Promotion> updatePromotion(@PathVariable Integer id, @RequestBody Promotion promotion) {
        Promotion updatedPromotion = adminService.updatePromotion(id, promotion);
        if (updatedPromotion != null) {
            return new ResponseEntity<>(updatedPromotion, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/promotions/{id}")
    public ResponseEntity<Void> deletePromotion(@PathVariable Integer id) {
        adminService.deletePromotion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
