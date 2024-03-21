package com.cinemabookingsystem.cinemadb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
       
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF protection for API endpoints typically
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/api/**").permitAll()  // Allow all requests to /api/** without authentication
                                .anyRequest().authenticated()  // Require authentication for all other requests
                )
                .httpBasic(httpBasic -> httpBasic.realmName("CinemaBooking"));  // Enable HTTP Basic authentication
    
            return http.build();
    }
}

