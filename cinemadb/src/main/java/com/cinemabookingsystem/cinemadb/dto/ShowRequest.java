package com.cinemabookingsystem.cinemadb.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ShowRequest {
    
    private LocalDate date;
    private LocalTime time;
    private Integer movieId;
    private Integer showroomId;
    
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public LocalTime getTime() {
        return time;
    }
    public void setTime(LocalTime time) {
        this.time = time;
    }
    public Integer getMovieId() {
        return movieId;
    }
    public void setMovieId(Integer movieId) {
        this.movieId = movieId;
    }
    public Integer getShowroomId() {
        return showroomId;
    }
    public void setShowroomId(Integer showroomId) {
        this.showroomId = showroomId;
    }

    
}
