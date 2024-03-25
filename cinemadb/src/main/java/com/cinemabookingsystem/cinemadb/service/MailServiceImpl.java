package com.cinemabookingsystem.cinemadb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String targetEmail, String url) {
        SimpleMailMessage verificationEmail = new SimpleMailMessage();
        verificationEmail.setFrom("teamb8cinema@gmail.com");
        verificationEmail.setTo(targetEmail);
        verificationEmail.setSubject("Registration Verification");
        verificationEmail.setText("Click this link to verify your email for the cinema booking system: " 
            + url + "/verify?email=" + targetEmail);

        mailSender.send(verificationEmail);
    }
}
