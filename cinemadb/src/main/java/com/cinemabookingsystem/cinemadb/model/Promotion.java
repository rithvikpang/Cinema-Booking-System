package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.time.LocalDate;

@Entity
@Table(schema = "cinema_db", name = "promotion")
public class Promotion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer promotion_id;
    private LocalDate start_date;
    private LocalDate end_date;
    private String code;
    private Float discount;
    
    public Promotion() {

    }
    
    public Integer getPromotionId() {
        return promotion_id;
    }
    public void setPromotionId(Integer promotion_id) {
        this.promotion_id = promotion_id;
    }
    public LocalDate getStartDate() {
        return start_date;
    }
    public void setStartDate(LocalDate start_date) {
        this.start_date = start_date;
    }
    public LocalDate getEndDate() {
        return end_date;
    }
    public void setEndDate(LocalDate end_date) {
        this.end_date = end_date;
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public Float getDiscount() {
        return discount;
    }
    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    
}
