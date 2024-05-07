'use client';
import React, { FormEvent, use } from 'react';
import { useSearchParams , useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import router from 'next/router';

interface SeatStatusDTO {
  showId: number;
  seatId: number;
  rowLetter: string;
  seatNumber: number;
  isBooked: boolean;
  ticketType: string;
}

interface PaymentRequest {
  cardId: number;
  cardNumber: string;
  cvv: string;
}

interface BookingRequest {
  showId: number;
  ticketCount: number;
  userEmail: string;
  seatStatusDTOs: SeatStatusDTO[];
  paymentRequest: PaymentRequest;
  totalPrice: number;
}

const formatDateTime = (dateString: string, timeString: string) => {
  const [year, month, day] = dateString.split(',');
  const [hour, minute] = timeString.split(',');

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

  const formattedDate = date.toISOString().slice(0, 10);
  const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  return `${formattedDate} at ${formattedTime}`;
};

interface seat {
  row: string;
  column: string;
}

const Checkout: React.FC = () => {
  const searchParams = useSearchParams();
  const selectedSeats = searchParams?.get('selectedSeats')?.split(',') || [];
  console.log("htrfv " + selectedSeats);
  const adultCount = parseInt(searchParams?.get('adultCount') || '0');
  const childCount = parseInt(searchParams?.get('childCount') || '0');
  const seniorCount = parseInt(searchParams?.get('seniorCount') || '0');
  const title = searchParams?.get('title') || '';
  const date = searchParams?.get('date') || '';
  const time = searchParams?.get('time') || '';
  const showroomId = searchParams?.get('showroomId') || '';
  const showId = searchParams?.get('showId') || '';
  const [seats, setSeats] = useState<string[]>([]);
  const [seatsDetails, setSeatsDetails] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCard, setSelectedCard] = useState('');

  const creditCards = [
    { id: 1, number: 'xxxx-xxxx-xxxx-4444' },
    { id: 2, number: 'xxxx-xxxx-xxxx-1234' }
  ];

  const bookingRequest: BookingRequest = {
    showId: 16,
    ticketCount: 2,
    userEmail: "sideelol@gmail.com",
    seatStatusDTOs: [
      { showId: 16, seatId: 651, rowLetter: 'F', seatNumber: 5, isBooked: false, ticketType: 'ADULT' },
      { showId: 16, seatId: 652, rowLetter: 'F', seatNumber: 6, isBooked: false, ticketType: 'ADULT' }
    ],
    paymentRequest: { cardId: 19, cardNumber: '1111222233334444', cvv: '123' },
    totalPrice: 100.00
  };


  function parseSeat(seat: string) {
    // Check if the seat ID format is valid
    if (!/^[A-Za-z]\d+$/.test(seat)) {
        throw new Error('Invalid seat ID format');
    }

    // Extract the row as the first character
    const row = seat.charAt(0);

    // Extract the column as the substring from the second character to the end
    const column = seat.slice(1);

    // Return the row and column
    return { row, column };
}

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the stored JWT token
      if (!token) {
        router.push("/unauth-page");
        console.error('No token found in localStorage');
        setLoading(false);
        return;
      }
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);
      const email = decodedToken.sub;
  }, []);

  const formattedDateTime = formatDateTime(date, time);

  useEffect(() => {
    // Extracting seats from URL query parameter
    const searchParams = new URLSearchParams(location.search);
    const seats = searchParams.get('seats')?.split(',') || [];

    // Process each seat
    seats.forEach(async (seat) => {
        const { row, column } = parseSeat(seat);

        try {
          const response = await fetch(`http://localhost:8080/api/booking/get-seat/${showroomId}/${row}/${column}`);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
      } catch (error) {
          console.error(`Failed to fetch data for seat ${seat}:`, error);
          // Optionally manage error states or notify the user
      }
    });
}, [seats]);

  const calculateTotalCost = () => {
    const adultPrice = 11.99;
    const childPrice = 8.99;
    const seniorPrice = 9.99;

    const adultCost = adultCount * adultPrice;
    const childCost = childCount * childPrice;
    const seniorCost = seniorCount * seniorPrice;

    return adultCost + childCost + seniorCost;
  };

  const totalCost = calculateTotalCost();
  const fees = 7;
  const tax = 1.12;
  const totalAmount = totalCost + fees + tax;

  const handlePromoCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle promo code submission logic here
  };

  const handleCancelOrder = () => {
    alert('Order cancelled');
    router.push('/');
  };

  const handleCardChange = (event: any) => {
    setSelectedCard(event.target.value);
 };

  const handleSubmitOrder = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/booking/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert('Booking confirmed!');
      router.push('/order-confirmation');
      console.log(data);
    } catch (error) {
      alert('Error confirming booking');
    }
  };

  return (
    <form className="container">
      <h1>Checkout</h1>
      <h2>Order Summary</h2>
      <div className="order-sum-item block">
        <label htmlFor="frm-title">Movie Title</label>
        <label htmlFor="frm-title">{title}</label>
      </div>
      <div className="order-sum-item block">
        <label htmlFor="frm-showtime">Showtime</label>
        <label htmlFor="frm-showtime">{formattedDateTime}</label>
      </div>
      <div className="order-sum-item block">
        <label htmlFor="frm-tickets">Number of Tickets</label>
        <label htmlFor="frm-tickets">{selectedSeats.length}</label>
      </div>
      <div className="order-sum-item block">
        <label htmlFor="frm-cost-num">Cost</label>
        <label htmlFor="frm-cost-num">${totalCost.toFixed(2)}</label>
      </div>
      <div className="order-sum-item block">
        <label htmlFor="frm-promo">Promo Code</label>
        <div className="promo block">
          <div className="promo-item">
            <input id="frm-promo" type="text" name="promo" autoComplete="promo" required />
          </div>
          <div className="promo-item">
            <button type="button" onClick={handlePromoCodeSubmit}>
              Apply
            </button>
          </div>
        </div>
      </div>
      <div className="order-sum-item block">
        <label htmlFor="frm-discount">Discount</label>
        <label htmlFor="frm-discount">$0</label>
      </div>
      <div className="order-sum-item block">
        <label htmlFor="frm-fees">Fees</label>
        <label htmlFor="frm-fees">${fees.toFixed(2)}</label>
      </div>
      <div className="order-sum-item block">
        <label htmlFor="frm-tax">Tax</label>
        <label htmlFor="frm-tax">${tax.toFixed(2)}</label>
      </div>
      <div className="order-sum-item block">
        <label htmlFor="frm-total">Total</label>
        <label htmlFor="frm-total">${totalAmount.toFixed(2)}</label>
      </div>
      <h1>Payment Information</h1>
        <div className= "credit-card-select">
            <label htmlFor="credit-card-select">Choose a credit card:</label>
            <select id="credit-card-select" value={selectedCard} onChange={handleCardChange} className='card-cat'>
                <option value="">Select a card...</option>
                {creditCards.map(card => (
                    <option key={card.id} value={card.number}>{card.number}</option>
                ))}
            </select>
        </div>
        <div>
                <h2>Add Card</h2>
            </div>
            <form>
              <div className="name block">
                  <label htmlFor="frm-name">Name on Payment Card</label>
                  <input 
                  id="inp"
                  type="text"
                  name="name"
                  autoComplete="name"
                  />
              </div>
              <div className="card-num block">
                  <label htmlFor="frm-card-num">Card Number</label>
                  <input
                  id="inp"
                  type="card-num"
                  name="text"
                  autoComplete="card-num"
                  />
              </div>
              <div className="card-info block">
                  <div>
                  <label htmlFor="frm-exp">Expiration Month</label>
                  <input
                      id="inp"
                      type="text"
                      name="exp"
                      autoComplete="exp"
                  />
                  </div>
                  <div className="card-info block">
                  <div>
                  <label htmlFor="frm-exp">Expiration Year</label>
                  <input
                      id="inp"
                      type="text"
                      name="exp"
                      autoComplete="exp"
                  />
                  </div>
                </div>
                <div>
                  <label htmlFor="frm-cvv">CVV</label>
                  <input
                      id="inp"
                      type="text"
                      name="cvv"
                      autoComplete="cvv"
                  />
                  </div>
              </div>
            </form>
      <div className="cancel-submit block">
        <div className="button block">
          <button type="button" onClick={handleCancelOrder}>
            Cancel Order
          </button>
        </div>
        <div className="button block">
          <button type="button" onClick={handleSubmitOrder}>
            Submit Order
          </button>
        </div>
      </div>
    </form>
  );
}

export default Checkout;
