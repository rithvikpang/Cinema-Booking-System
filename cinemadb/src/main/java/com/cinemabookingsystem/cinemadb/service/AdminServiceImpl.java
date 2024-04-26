package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.dto.ShowRequest;
import com.cinemabookingsystem.cinemadb.model.Movie;
import com.cinemabookingsystem.cinemadb.model.Promotion;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.Showroom;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.MovieRepository;
import com.cinemabookingsystem.cinemadb.repository.PromotionRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowRepository;
import com.cinemabookingsystem.cinemadb.repository.ShowroomRepository;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class AdminServiceImpl implements AdminService {


    @Autowired
    private ShowRepository showRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private ShowroomRepository showroomRepository;
    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailServiceImpl mailService;
    
    @SuppressWarnings("null")
    @Override
    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    @Override
    public Movie editMovie(Integer movieId, Movie movie) {
        Movie existingMovie = movieRepository.findById(movieId)
            .orElseThrow(() -> new IllegalStateException("Movie not found with id: " + movieId));
        
        // set fields of updated movie
        existingMovie.setTitle(movie.getTitle());
        existingMovie.setDescription(movie.getDescription());
        existingMovie.setDuration(movie.getDuration());
        existingMovie.setReleaseDate(movie.getReleaseDate());
        existingMovie.setGenreId(movie.getGenreId());
        existingMovie.setRating(movie.getRating());
        existingMovie.setCategory(movie.getCategory());
        existingMovie.setCast(movie.getCast());
        existingMovie.setDirector(movie.getDirector());
        existingMovie.setImageUrl(movie.getImageUrl());
        existingMovie.setTrailerUrl(movie.getTrailerUrl());
        existingMovie.setProducer(movie.getProducer());
        existingMovie.setReviews(movie.getReviews());
        return movieRepository.save(existingMovie);
    }

    @Override
    public Show scheduleShow(ShowRequest showRequest) {
        // Get movie
        Movie movie = movieRepository.findById(showRequest.getMovieId())
            .orElseThrow(() -> new IllegalArgumentException("Movie not found with id: " 
                + showRequest.getMovieId()));
        // Get showroom
        Showroom showroom = showroomRepository.findById(showRequest.getShowroomId())
            .orElseThrow(() -> new IllegalArgumentException("Showroom not found with id: " 
            + showRequest.getShowroomId()));
        // duration of movie to check times
        int duration = movie.getDuration();
        // return error if showroom is booked
        if(isShowroomBooked(showroom, showRequest.getDate(),
            showRequest.getTime(), duration)) {
                throw new IllegalArgumentException("This showroom is booked at: " + showRequest.getTime());
            }
        // Construct show and set fields
        Show show = new Show();
        show.setDate(showRequest.getDate());
        show.setTime(showRequest.getTime());
        show.setDuration(duration);
        show.setMovie(movie);
        show.setShowroom(showroom);
        // add this show to the showroom's set of shows
        movie.setShow(show);
        return showRepository.save(show); 
    }

    @Override
    public boolean isShowroomBooked(Showroom showroom, LocalDate date, LocalTime time, int duration) {
        boolean isShowroomBooked = false;
        // Set of shows on this date and in this showroom
        Set<Show> shows = showRepository.findByDateAndShowroom(date, showroom);
        // If there are no shows, return
        if(shows == null) {
            return isShowroomBooked;
        }
        // Duration of movie, plus 30 minutes to allow for transition between shows
        LocalTime endTime = time.plusMinutes(duration + 30);
        // loop over shows for this date in this showroom
        for(Show show : shows) {
            // if desired show time is booked, return
            if(time.compareTo(show.getTime()) >= 0 
                && show.getTime().compareTo(endTime) <= 0 ) {
                    isShowroomBooked = true;
                    return isShowroomBooked;
                }
        }
        return isShowroomBooked;
        }

        @Override
        public Promotion createPromotion(Promotion promotion) {
            return promotionRepository.save(promotion);
        }

        @Override
        public List<Promotion> getAllPromotions() {
            return promotionRepository.findAll();
        }
    
        @Override
        public Optional<Promotion> getPromotionById(Integer id) {
            return promotionRepository.findById(id);
        }
    
        @Override
        public Promotion updatePromotion(Integer id, Promotion updatedPromotion) {
            Optional<Promotion> existingPromotionOptional = promotionRepository.findById(id);
            if (existingPromotionOptional.isPresent()) {
                Promotion existingPromotion = existingPromotionOptional.get();
                existingPromotion.setStartDate(updatedPromotion.getStartDate());
                existingPromotion.setEndDate(updatedPromotion.getEndDate());
                existingPromotion.setCode(updatedPromotion.getCode());
                existingPromotion.setDiscount(updatedPromotion.getDiscount());
                return promotionRepository.save(existingPromotion);
            } else {
                throw new IllegalArgumentException("Promotion with ID " + id + " not found");
            }
        }
    
        @Override
        public void deletePromotion(Integer id) {
            promotionRepository.deleteById(id);
        }

        @Override
        public void sendPromotionEmails() {
            List<User> usersWithPromotions = userRepository.findByPromotions(true); // Assuming "promotions" is the field in the User entity indicating if the user wants to be emailed about promotions
            for (User user : usersWithPromotions) {
                mailService.sendPromotionEmails(user);
            }
        }

}
