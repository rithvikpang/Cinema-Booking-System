'use client';
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface SeatItem {
  seat: string;
  ageGroup: string;
  price: number;
}

const formatDateTime = (dateString: string, timeString: string) => {
  const [year, month, day] = dateString.split(',');
  const [hour, minute] = timeString.split(',');

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

  const formattedDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  return `${formattedDate} at ${formattedTime}`;
};

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedSeats = searchParams?.get("selectedSeats")?.split(",") || [];
  const adultCount = parseInt(searchParams?.get("adultCount") || "0");
  const childCount = parseInt(searchParams?.get("childCount") || "0");
  const seniorCount = parseInt(searchParams?.get("seniorCount") || "0");
  const title = searchParams?.get("title") || "";
  const date = searchParams?.get("date") || "";
  const time = searchParams?.get("time") || "";
  const showroomId = searchParams?.get("showroomId") || "";
  const showId = searchParams?.get("showId") || "";

  const formattedDateTime = formatDateTime(date, time);

  const renderSeatLabel = (seatIndex: number) => {
    const row = Math.floor(seatIndex / 10);
    const col = seatIndex % 10;
    const rowLabel = String.fromCharCode(65 + row);
    const colLabel = col + 1;
    return `${rowLabel}${colLabel}`;
  };

  const handleCancelTicket = (index: number) => {
    const updatedSelectedSeats = [...selectedSeats];
    const canceledSeatIndex = updatedSelectedSeats[index];
    updatedSelectedSeats.splice(index, 1);
  
    let updatedAdultCount = adultCount;
    let updatedChildCount = childCount;
    let updatedSeniorCount = seniorCount;
  
    let ageGroup = "";
  
    if (updatedAdultCount > 0) {
      ageGroup = "Adult";
      updatedAdultCount--;
    } else if (updatedChildCount > 0) {
      ageGroup = "Child";
      updatedChildCount--;
    } else if (updatedSeniorCount > 0) {
      ageGroup = "Senior";
      updatedSeniorCount--;
    }
  
    const queryParams = new URLSearchParams();
    queryParams.append("selectedSeats", updatedSelectedSeats.join(","));
    queryParams.append("adultCount", updatedAdultCount.toString());
    queryParams.append("childCount", updatedChildCount.toString());
    queryParams.append("seniorCount", updatedSeniorCount.toString());
    queryParams.append("showroomId", showroomId);
    queryParams.append("showId", showId);
    queryParams.append("title", title);
    queryParams.append("date", date);
    queryParams.append("time", time);
  
    router.push(`/tickets?${queryParams.toString()}`);
  };

  const renderSeatItems = () => {
    const seatItems: SeatItem[] = [];
    let adultSeats = adultCount;
    let childSeats = childCount;
    let seniorSeats = seniorCount;

    selectedSeats.forEach((seatIndex) => {
      const seatLabel = renderSeatLabel(parseInt(seatIndex));
      let ageGroup = "";
      let price = 0;

      if (adultSeats > 0) {
        ageGroup = "Adult";
        price = 11.99;
        adultSeats--;
      } else if (childSeats > 0) {
        ageGroup = "Child";
        price = 8.99;
        childSeats--;
      } else if (seniorSeats > 0) {
        ageGroup = "Senior";
        price = 9.99;
        seniorSeats--;
      }

      seatItems.push({ seat: seatLabel, ageGroup, price });
    });

    return seatItems.map(({ seat, ageGroup, price }, index) => (
      <div key={index} className="order-sum-item">
        <label className="tickets-label" htmlFor="message">
          {seat}
        </label>
        <label className="tickets-label" htmlFor="message">
          {ageGroup}
        </label>
        <label className="tickets-label" htmlFor="message">
          ${price.toFixed(2)}
        </label>
        <div className="tickets-button block">
          <button type="button" onClick={() => handleCancelTicket(index)}>
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    const queryParams = new URLSearchParams();
    queryParams.append("selectedShowTime", `${date} ${time}`);
    queryParams.append("showroomId", showroomId);
    queryParams.append("showId", showId);
    queryParams.append("title", title);
    queryParams.append("date", date);
    queryParams.append("time", time);
    queryParams.append("ticketCount", (adultCount + childCount + seniorCount).toString());
    queryParams.append("adultCount", adultCount.toString());
    queryParams.append("childCount", childCount.toString());
    queryParams.append("seniorCount", seniorCount.toString());
  
    router.push(`/select-seats?${queryParams.toString()}`);
  };
  
  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    const queryParams = new URLSearchParams();
    queryParams.append("selectedSeats", selectedSeats.join(","));
    queryParams.append("adultCount", adultCount.toString());
    queryParams.append("childCount", childCount.toString());
    queryParams.append("seniorCount", seniorCount.toString());
    queryParams.append("showroomId", showroomId);
    queryParams.append("showId", showId);
    queryParams.append("title", title);
    queryParams.append("date", date);
    queryParams.append("time", time);
  
    router.push(`/checkout-pg2?${queryParams.toString()}`);
  };

  return (
    <div className="container">
      <h1>Tickets</h1>
      <div className="order-label">
        <label className="movie-tickets-label" htmlFor="message">
          Movie
        </label>
        <label className="movie-tickets-label" htmlFor="message">
          Time
        </label>
      </div>
      <div className="form-section">
        <div className="order-sum-item">
          <label className="tickets-label" htmlFor="message">
            {title}
          </label>
          <label className="tickets-label" htmlFor="message">
            {formattedDateTime}
          </label>
        </div>
      </div>
      <div className="order-label">
        <label className="movie-tickets-label" htmlFor="message">
          Seat
        </label>
        <label className="movie-tickets-label" htmlFor="message">
          Age
        </label>
        <label className="movie-tickets-label" htmlFor="message">
          Price
        </label>
        <label className="movie-tickets-label" htmlFor="message"></label>
        <label className="movie-tickets-label" htmlFor="message"></label>
      </div>
      <div>
        <div className="form-section">{renderSeatItems()}</div>
        <div
          className="order-label"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="back-cont-button block">
            <button className="seats" onClick={handleBackButtonClick}>
              Back
            </button>
          </div>
          <div className="back-cont-button block">
            <button className="seats" onClick={handleNextButtonClick}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}