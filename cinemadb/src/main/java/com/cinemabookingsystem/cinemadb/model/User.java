package com.cinemabookingsystem.cinemadb.model;

import java.time.Instant;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
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
    
    // @JsonProperty("user_id")
    private Integer user_id;

    // @JsonProperty("isadmin")
    private Boolean isadmin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<PaymentCard> PaymentCards;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private BillingAddress billingAddress;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Booking> bookings;

    // Constructors, getters, and setters
    public User() {

    }

    public Boolean isAdmin() {
        return isadmin;
    }

    public void setAdmin(Boolean isadmin) {
        this.isadmin = isadmin;
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

    public Integer getUserId() {
        return user_id;
    }

    public void setUserId(Integer user_id) {
        this.user_id = user_id;
    }

    public Set<PaymentCard> getPaymentCards() {
        return PaymentCards;
    }

    public void setPaymentCards(Set<PaymentCard> paymentCards) {
        PaymentCards = paymentCards;
    }

    public BillingAddress getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(BillingAddress billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }
}

