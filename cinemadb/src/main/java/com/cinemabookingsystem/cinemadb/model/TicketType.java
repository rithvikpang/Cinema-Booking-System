package com.cinemabookingsystem.cinemadb.model;

public enum TicketType {
    SENIOR,
    ADULT,
    CHILD,
    FEE;

    @Override
    public String toString() {
        switch (this) {
            case SENIOR: return "Senior";
            case ADULT: return "Adult";
            case CHILD: return "Child";
            case FEE: return "Fee";
            default: throw new IllegalArgumentException("Unknown status: " + this);
        }
    }

}
