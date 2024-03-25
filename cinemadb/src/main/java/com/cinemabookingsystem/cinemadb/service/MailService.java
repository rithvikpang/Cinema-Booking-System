package com.cinemabookingsystem.cinemadb.service;

public interface MailService {
    public void sendVerificationEmail(String targetEmail, String url);
}
