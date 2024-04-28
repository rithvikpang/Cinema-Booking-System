package com.cinemabookingsystem.cinemadb.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ShowRequest {
    
    private String date;
    private String time;
    private Integer movieId;
    private Integer showroomId;
    private Integer duration;
    private Integer showId;
    
    public Integer getShowId() {
        return showId;
    }
    public void setShowId(Integer showId) {
        this.showId = showId;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
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
    public Integer getDuration() {
        return duration;
    }
    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    
}
