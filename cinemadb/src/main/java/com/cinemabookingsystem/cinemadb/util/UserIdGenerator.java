package com.cinemabookingsystem.cinemadb.util;

import java.util.Random;

public class UserIdGenerator {
    
     public static String generateRandomUserId() {
        int length = 6;
        Random random = new Random();
        StringBuilder newUserId = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            newUserId.append(random.nextInt(10));
        }
        return newUserId.toString();
    }
}
