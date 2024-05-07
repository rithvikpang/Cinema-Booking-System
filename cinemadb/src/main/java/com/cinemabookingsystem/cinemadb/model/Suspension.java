package com.cinemabookingsystem.cinemadb.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(schema = "cinema_db", name = "suspensions")
public class Suspension {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int suspensionId;

    private LocalDate startDate; 
    private LocalDate endDate; // End date of suspension
    private String reason; // Reason for suspension

    // @OneToOne
    // @JoinColumn(name = "email", referencedColumnName = "email")
    // private User user;

    @Column(nullable = false)
    private String email;

    public int getSuspensionId() {
        return suspensionId;
    }

    public void setSuspensionId(int suspensionId) {
        this.suspensionId = suspensionId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    // public User getUser() {
    //     return user;
    // }

    // public void setUser(User user) {
    //     this.user = user;
    // }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
