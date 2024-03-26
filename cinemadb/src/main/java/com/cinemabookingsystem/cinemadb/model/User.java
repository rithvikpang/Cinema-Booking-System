package com.cinemabookingsystem.cinemadb.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(schema = "cinema_db", name = "users")
public class User {
    
    @Id
    private String email;
    private String firstname;
    private String lastname;
    private int age;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String password;
    private boolean promotions;
    private String status;
    private boolean isverified;
    private Instant created_at;
    private int user_id;
    private boolean isadmin;

    // Constructors, getters, and setters
    public User() {

    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isPromotions() {
        return promotions;
    }

    public void setPromotions(boolean promotions) {
        this.promotions = promotions;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public boolean isVerified() {
        return isverified;
    }

    public void setIsVerified(boolean isverified) {
        this.isverified = isverified;
    }

    public Instant getCreatedAt() {
        return created_at;
    }

    public void setCreatedAt(Instant created_at) {
        this.created_at = created_at;
    }

    public boolean isIsverified() {
        return isverified;
    }

    public void setIsverified(boolean isverified) {
        this.isverified = isverified;
    }

    public int getUserId() {
        return user_id;
    }

    public void setUserId(int user_id) {
        this.user_id = user_id;
    }

    public boolean isAdmin() {
        return isadmin;
    }

    public void setAdmin(boolean isadmin) {
        this.isadmin = isadmin;
    }

    
}

