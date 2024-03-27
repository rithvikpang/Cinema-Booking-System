package com.cinemabookingsystem.cinemadb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cinemabookingsystem.cinemadb.security.JwtRequestFilter;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
       
    @SuppressWarnings("deprecation")
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
           http
                   .csrf(csrf -> csrf.disable()) // Disable CSRF
                   .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                   .authorizeRequests(authorizeRequests ->
                           authorizeRequests
                                   .requestMatchers("/api/**").permitAll()
                                   .anyRequest().authenticated() 
                   )
                   .addFilterBefore(jwtRequestFilter(), UsernamePasswordAuthenticationFilter.class); 

    return http.build();
}

    @Bean
    public JwtRequestFilter jwtRequestFilter() {
        return new JwtRequestFilter();
    }
}

