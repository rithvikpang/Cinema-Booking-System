import React from 'react';

export default function Home() {    
  return (
        <form className="container">
            <h1>Checkout</h1>
            <h2>Order Summary</h2>
            <div className="order-sum-item block">
                <label htmlFor="frm-tickets">Number of Tickets</label>
                <label htmlFor="frm-tickets">3</label>
            </div>
            <div className="order-sum-item block">
                <label htmlFor="frm-cost-num">Cost</label>
                <label htmlFor="frm-cost-num">$26.97</label>
            </div>
            <div className="order-sum-item block">
                <label htmlFor="frm-promo">Promo Code</label>
                <div className="promo block">
                    <div className="promo-item">
                        <input
                        id="frm-promo"
                        type="text"
                        name="promo"
                        autoComplete="promo"
                        required
                        />
                    </div>
                    <div className="promo-item">
                        <button type="submit">Apply</button>
                    </div>
                </div>
            </div>
            <div className="order-sum-item block">
                <label htmlFor="frm-discount">Discount</label>
                <label htmlFor="frm-discount">$0</label>
            </div>
            <div className="order-sum-item block">
                <label htmlFor="frm-fees">Fees</label>
                <label htmlFor="frm-fees">$7</label>
            </div>
            <div className="order-sum-item block">
                <label htmlFor="frm-tax">Tax</label>
                <label htmlFor="frm-tax">$1.12</label>
            </div>
            <div className="cancel-submit block">
                <div className="button block">
                    <button type="submit">Cancel Order</button>
                </div>
                <div className="button block">
                    <button type="submit">Submit Order</button>
                </div>
            </div>
        </form>
  );
}