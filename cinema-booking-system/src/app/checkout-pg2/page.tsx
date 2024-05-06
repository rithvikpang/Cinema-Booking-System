'use client';
import React, { FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

const formatDateTime = (dateString: string, timeString: string) => {
  const [year, month, day] = dateString.split(',');
  const [hour, minute] = timeString.split(',');

  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));

  const formattedDate = date.toISOString().slice(0, 10);
  const formattedTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  return `${formattedDate} at ${formattedTime}`;
};

export default function Home() {
  const searchParams = useSearchParams();
  const selectedSeats = searchParams?.get('selectedSeats')?.split(',') || [];
  const adultCount = parseInt(searchParams?.get('adultCount') || '0');
  const childCount = parseInt(searchParams?.get('childCount') || '0');
  const seniorCount = parseInt(searchParams?.get('seniorCount') || '0');
  const title = searchParams?.get('title') || '';
  const date = searchParams?.get('date') || '';
  const time = searchParams?.get('time') || '';
  const showroomId = searchParams?.get('showroomId') || '';
  const showId = searchParams?.get('showId') || '';

  const formattedDateTime = formatDateTime(date, time);

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
    // Handle cancel order logic here
  };

  const handleSubmitOrder = () => {
    // Handle submit order logic here
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