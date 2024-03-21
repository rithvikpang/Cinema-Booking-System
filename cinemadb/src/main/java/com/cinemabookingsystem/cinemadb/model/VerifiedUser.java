package com.cinemabookingsystem.cinemadb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(schema = "cinema_db", name = "verified_users")
public class VerifiedUser {
    
    // Enumeration for role
    public enum Role {
        admin, verfiied_user
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;

    // Maps one to one relationship with User entity
    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private User user;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Instant created_at;

    public VerifiedUser() {
        
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password= password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Instant getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Instant created_at) {
        this.created_at = created_at;
    }
}
