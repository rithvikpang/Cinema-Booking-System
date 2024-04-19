package com.cinemabookingsystem.cinemadb.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtUtil {

    @Autowired
    private SecretKey secretKey;

    public String getUsernameFromToken(String token) {
        return parseJws(token).getBody().getSubject();
    }

    public boolean isTokenExpired(String token) {
        return parseJws(token).getBody().getExpiration().before(new Date());
    }

    private Jws<Claims> parseJws(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
    }
}
