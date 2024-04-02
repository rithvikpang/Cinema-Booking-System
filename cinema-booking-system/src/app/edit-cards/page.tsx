"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from "next/link"

interface Card {
    cardNumber: string;
    id: number
}

export default function Home() {
    
    const [cards, setCards] = useState<Card[]>([]);
    useEffect(() => {
        const fetchCards = async () => {
          const token = localStorage.getItem('token'); // Retrieve the stored JWT token
          const response = await fetch('/api/user/get-payment-cards', {
            headers: new Headers({
              'Authorization': `Bearer ${token}`,
            }),
          });
          if (response.ok) {
            const data: Card[] = await response.json();
            setCards(data);
          }
        };
        
        fetchCards();
      }, []);

      const handleDelete = async (id: number) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/user/delete-payment-card/${id}`, { // Adjust endpoint as needed
          method: 'DELETE',
          headers: new Headers({
            'Authorization': `Bearer ${token}`,
          }),
        });
        
        if (response.ok) {
          // Remove the deleted card from the state to update the UI
          setCards(cards.filter(card => card.id !== id));
        }
      };
    
    return (
        <div className="container">
            <h1>Edit Cards</h1>
            <h2>Cards:</h2>
            <div className="cards">
                {cards.map(card => (
                <div key={card.id} className="card">
                    <h3>{card.cardNumber}</h3>
                    <div className="delete block">
                        <button onClick={() => handleDelete(card.id)} type="button">Delete</button>
                    </div>
                </div>
                ))}
            </div>
            <div>
                <h2>Add Card</h2>
            </div>
            <div className="name block">
                <label htmlFor="frm-name">Name on Payment Card</label>
                <input
                id="frm-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                />
            </div>
            <div className="card-num block">
                <label htmlFor="frm-card-num">Card Number</label>
                <input
                id="frm-card-num"
                type="card-num"
                name="text"
                autoComplete="card-num"
                required
                />
            </div>
            <div className="card-info block">
                <div>
                <label htmlFor="frm-exp">State</label>
                <input
                    id="frm-exp"
                    type="text"
                    name="exp"
                    autoComplete="exp"
                    required
                />
                </div>
                <div>
                <label htmlFor="frm-cvv">Zip Code</label>
                <input
                    id="frm-cvv"
                    type="text"
                    name="cvv"
                    autoComplete="cvv"
                    required
                />
                </div>
            </div>
            <div className="button block">
                <button type="submit">Add Card</button>
            </div>
        </div>
    );
}