package com.cinemabookingsystem.cinemadb.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateParser {
    public static LocalDate parseDate(String dateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_OFFSET_DATE_TIME;
        // Parse the date-time string with time zone offset
        return LocalDate.parse(dateString, formatter);
    }
}

