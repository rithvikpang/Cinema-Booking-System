package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Assuming you have a method to check if the user is an admin
        boolean isAdmin = user.isAdmin();

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            isAdmin ? Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")) :
                      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
