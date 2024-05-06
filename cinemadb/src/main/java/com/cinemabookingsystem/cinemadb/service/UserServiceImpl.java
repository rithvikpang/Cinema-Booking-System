package com.cinemabookingsystem.cinemadb.service;

import java.time.LocalDateTime;
import java.util.*;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cinemabookingsystem.cinemadb.dto.UserDTO;
import com.cinemabookingsystem.cinemadb.model.PasswordResetToken;
import com.cinemabookingsystem.cinemadb.model.User;
import com.cinemabookingsystem.cinemadb.repository.PasswordResetTokenRepository;
import com.cinemabookingsystem.cinemadb.repository.UserRepository;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.LoggerFactory;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    // private PasswordResetTokenRepository tokenRepository;
    private String fromEmail = "teamb8cinemabooking@gmail.com";
    // private ResourceBundle resourceBundle = ResourceBundle.getBundle("messages",
    // Locale.US);
    // private BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder();

    private JavaMailSender javaMailSender;

    public UserServiceImpl(UserRepository userRepository, PasswordResetTokenRepository passwordResetTokenRepository,
            JavaMailSender javaMailSender) {
        this.userRepository = userRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.javaMailSender = javaMailSender;
    }

    @Override
    public boolean emailExists(String email) {
        return userRepository.existsById(email);
    }

    @SuppressWarnings("null")
    @Override
    public User getUserByEmail(String email) {
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
        return user; // Assume you have a method to convert a User entity to a UserDTO
    }

    // private SimpleMailMessage optEmailSend(User user, int otp) {
    //     SimpleMailMessage msg = new SimpleMailMessage();
    //     msg.setFrom(fromEmail);
    //     msg.setTo(user.getEmail());

    //     msg.setSubject("Log in to your account");
    //     msg.setText("Please enter the following verification code to verify this login attempt." + "\n\n" + otp
    //             + "\n\n" + "If you did not request this code, please ignore this email." + "\n\n"
    //             + "Thanks, Cinema Booking System");
    //     return msg;
    // }

    // @Override
    // public String sendResetEmail(String email, HttpServletRequest request) {
    // try {
    // Optional<User> optionalUser = userRepository.findByEmail(email);
    // if (optionalUser.isPresent()) {
    // User user = optionalUser.get();
    // String token = UUID.randomUUID().toString();
    // user.setEmail(email);
    // user.setPasswordToken(token);
    // userRepository.save(user);
    // javaMailSender.send(constructEmail(getAppUrl(request), request.getLocale(),
    // token, user));
    // return "SUCCESS";
    // } else {
    // throw new UsernameNotFoundException("USER NOT FOUND");
    // }
    // } catch (Exception e) {
    // e.printStackTrace();
    // return null;
    // }

    // }

    @SuppressWarnings("null")
    @Override
    public void updateUser(User user, String email) {
        // Fetch the existing user from the database
        User existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        // Update the user's details
        existingUser.setUserId(user.getUserId());
        existingUser.setAdmin(user.isAdmin());
        existingUser.setFirstname(user.getFirstname());
        existingUser.setLastname(user.getLastname());
        existingUser.setAddress(user.getAddress());
        existingUser.setAge(user.getAge());
        existingUser.setCity(user.getCity());
        existingUser.setState(user.getState());
        existingUser.setZip(user.getZip());

        // Save the updated user back to the database
        userRepository.save(existingUser);
    }

    // private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // @Override
    // public void sendVerificationCode(User user) {
    // mailService.sendVerificationCode(user);
    // }

    // @Override
    // public boolean validateVerificationCode(String verificationCode) {
    // try {
    // Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(verificationCode);
    // return true;
    // } catch (Exception e) {
    // return false;
    // }
    // }

    @Autowired
    private PasswordEncoder passwordEncoder;

    // public boolean resetPassword(String userEmail, String newPassword) {
    // User user = getUserByEmail(userEmail);
    // if (user == null) {
    // return false;
    // }

    // user.setPassword(passwordEncoder.encode(newPassword));
    // userRepository.save(user);

    // return true;
    // }

    private final int minutes = 10;

    public String generateToken() {
        return UUID.randomUUID().toString();
    }

    public LocalDateTime expireTimeRange() {
        return LocalDateTime.now().plusMinutes(minutes);
    }

    // public void sendEmail(String to, String subject, String emailLink)
    // throws MessagingException, UnsupportedEncodingException {
    // MimeMessage message = javaMailSender.createMimeMessage();
    // MimeMessageHelper helper = new MimeMessageHelper(message);

    // String emailContent = "<p>Click the link below to reset your password:</p>" +
    // "<p><a href=\"" + emailLink
    // + "\">Reset Password</a></p>"
    // + "<br>"
    // + "<p>If you did not request a password reset, please ignore this
    // email.</p>";

    // helper.setText(emailContent, true);
    // helper.setFrom("teamb8cinemabooking@gmail.com", "Cinema Booking System");
    // helper.setSubject(subject);
    // helper.setTo(to);
    // javaMailSender.send(message);

    // }

    // @Override
    // public boolean validateResetToken(String token) {
    // Optional<PasswordResetToken> resetToken = tokenRepository.findByToken(token);
    // return resetToken.isPresent() && resetToken.get().getExpiryTime().isAfter(new
    // Date().toInstant());
    // }

    public void updatePassword(User user, String email) {
        // Fetch the existing user from the database
        User existingUser = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));

        // Update the user's details
        // Be sure not to update the email or password fields if that's not intended
        existingUser.setPassword(user.getPassword());
        // ... set other fields, but do NOT set email or password here

        // Save the updated user back to the database
        userRepository.save(existingUser);
    }

    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users) {
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(user.getEmail());
            userDTO.setFirstname(user.getFirstname());
            userDTO.setLastname(user.getLastname());
            userDTO.setIsadmin(user.isAdmin());
            userDTO.setUser_id(user.getUserId());
            // Map other fields as needed
            userDTOs.add(userDTO);
        }
        return userDTOs;
    }

    public UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstname(user.getFirstname());
        userDTO.setLastname(user.getLastname());
        userDTO.setAddress(user.getAddress());
        userDTO.setAge(user.getAge());
        userDTO.setCity(user.getCity());
        userDTO.setState(user.getState());
        userDTO.setZip(user.getZip());
        userDTO.setUser_id(user.getUserId());
        userDTO.setIsadmin(user.isAdmin());
        // Map other properties as needed
        return userDTO;
    }

    @Transactional
    public void deleteUserProfile(String email) {
        // Retrieve the user entity from the database
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Delete the user
            userRepository.delete(user);
        } else {
            // Handle the case when the user is not found
            throw new RuntimeException("User with email " + email + " not found");
        }
    }
    // Implement other methods as needed

    private void sendEmail(String email, String token) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("teamb8cinemabooking@gmail.com");
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText(
                "To reset your password, click the link below:\n" + "http://localhost:3000/reset-password?token="
                        + token);
        javaMailSender.send(message);

    }

    private static final org.slf4j.Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Transactional
    public void forgotPassword(String email) {
        logger.info("Starting password reset process for: {}", email);
        User user = userRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found with email: " + email));
        logger.info("User found, checking for existing token...");
        PasswordResetToken token = new PasswordResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(LocalDateTime.now().plusMinutes(15));
        token.setUser(user);
        passwordResetTokenRepository.save(token);
        sendEmail(user.getEmail(), token.getToken());
    }

    public boolean resetPassword(String token, String newPassword) {

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));
        if (resetToken == null || resetToken.getExpiryTime().isBefore(LocalDateTime.now())) {
            return false;
        }
        User user = resetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        resetToken.setUsed(true);
        passwordResetTokenRepository.delete(resetToken);
        return true;
    }

}
