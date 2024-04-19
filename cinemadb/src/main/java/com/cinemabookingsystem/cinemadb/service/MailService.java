package com.cinemabookingsystem.cinemadb.service;

import com.cinemabookingsystem.cinemadb.model.User;

public interface MailService {
    public void sendVerificationEmail(String targetEmail, String url);
    public void sendVerificationCode(User user);
    public void sendPromotionEmails(User user);
}
