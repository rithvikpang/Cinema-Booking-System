package com.cinemabookingsystem.cinemadb.service;

import java.text.NumberFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cinemabookingsystem.cinemadb.model.Booking;
import com.cinemabookingsystem.cinemadb.model.Promotion;
import com.cinemabookingsystem.cinemadb.model.Show;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;
import com.cinemabookingsystem.cinemadb.util.CardEncrypter;
import com.cinemabookingsystem.cinemadb.util.UserIdGenerator;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class MailServiceImpl implements MailService {
    
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private UserRepository userRepository;

    public void sendVerificationEmail(String targetEmail, String url) {
        SimpleMailMessage verificationEmail = new SimpleMailMessage();
        // Generate new unique id for verification, this would be saved as the user's unique
        // id once verified successfully
        String newRandomUserId = UserIdGenerator.generateRandomUserId();
        verificationEmail.setFrom("teamb8cinema@gmail.com");
        verificationEmail.setTo(targetEmail);
        verificationEmail.setSubject("Registration Verification");
        verificationEmail.setText("Click this link to verify your email for the cinema booking system: " 
            + url + "/verify?email=" + targetEmail + "&code=" + newRandomUserId);
        mailSender.send(verificationEmail);
    }

    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    public void sendVerificationCode(User user) {
        String verificationCode = Jwts.builder()
                .setSubject(String.valueOf(user.getUserId()))
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000)) // 15 minutes
                .signWith(key)
                .compact();

        SimpleMailMessage verificationEmail = new SimpleMailMessage();
        verificationEmail.setFrom("teamb8cinema@gmail.com");
        verificationEmail.setTo(user.getEmail());
        verificationEmail.setSubject("Password Reset Token");
        verificationEmail.setText("Use the code to reset your password: " + verificationCode);
        mailSender.send(verificationEmail);
    }

@Override
public void sendPromotionEmails(User user, Promotion promotion) {
    SimpleMailMessage promotionEmail = new SimpleMailMessage();
    promotionEmail.setFrom("teamb8cinema@gmail.com");
    promotionEmail.setTo(user.getEmail());
    promotionEmail.setSubject("New Promotion Alert");
    promotionEmail.setText("Dear " + user.getFirstname() + ",\n\n"
        + "Check out our latest promotion:\n\n"
        + "Promo Code: " + promotion.getCode() + "\n"
        + "Discount: " + promotion.getDiscount() + "%\n"
        + "Start Date: " + promotion.getStartDate() + "\n"
        + "End Date: " + promotion.getEndDate() + "\n\n"
        + "Visit our website for more details.");
    mailSender.send(promotionEmail);
}

@Override
public void sendBookingConfirmationEmail(User user, Booking booking) {
    SimpleMailMessage bookingConfirmationEmail = new SimpleMailMessage();
    NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.US);
    String formattedAmount = currencyFormat.format(booking.getTotalPrice());
    String maskCardNum = "XXXXXXXXXXXX" + CardEncrypter.decrypt(booking.getPaymentCard().getCardNumber()).substring(12);

    bookingConfirmationEmail.setFrom("teamb8cinema@gmail.com");
    bookingConfirmationEmail.setTo(user.getEmail());
    bookingConfirmationEmail.setSubject("Booking Confirmation");
    bookingConfirmationEmail.setText("Dear " + user.getFirstname() + ",\n\n"
        + "Thank you for booking with us! \n\n"
        + "Booking Details: \n\n"
        + "Theater: " + booking.getShow().getShowroom().getTheater().getLocation() + "\n"
        + "Showroom Number: " + booking.getShow().getShowroom().getShowroomId() + "\n"
        + "Movie: " + booking.getShow().getMovie().getTitle() + "\n"
        + "Date: " + booking.getShow().getDate() + "\n"
        + "Time: " + booking.getShow().getTime() + "\n"
        + "Number of tickets: " + booking.getTicketCount() + "\n\n"
        + "Payment Transaction Info: \n"
        + "Order Total: " + formattedAmount + "\n"
        + "Charged to card: " + maskCardNum
    );
    mailSender.send(bookingConfirmationEmail);
}

}
