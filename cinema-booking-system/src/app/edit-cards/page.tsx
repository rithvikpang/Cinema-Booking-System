"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from "next/link"
import { jwtDecode } from 'jwt-decode';

interface Card {
    cardNumber: string;
    id: number
}

interface NewCardDetails {
  name: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string // Simplified for this example
  zipCode: string;
}

export default function Home() {
    
    const [cards, setCards] = useState<Card[]>([]);
    const [newCard, setNewCard] = useState<NewCardDetails>({ name: '', cardNumber: '', expiryMonth: '', expiryYear: '', zipCode: '' });

    useEffect(() => {
        const fetchCards = async () => {
          const token = localStorage.getItem('token'); // Retrieve the stored JWT token
          if (!token) {
            console.error('No token found in localStorage');
            return;
          }
          const decodedToken = jwtDecode(token);
          console.log('Decoded token:', decodedToken);
          const email = decodedToken.sub;
          
          if (!email) {
            console.error('Email not found in token');
            return;
          } else {
            console.log('Email:', email);
          }
          const encodedEmail = encodeURIComponent(email);
          const response = await fetch('http://localhost:8080/api/user/${encodedEmail}/get-payment-cards');
          if (response.ok) {
            const data: Card[] = await response.json();
            setCards(data);
          }
        };
        
        fetchCards();
      }, []);

      const handleDelete = async (id: number) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/user/delete-payment-card/${id}`, { // Adjust endpoint as needed
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

      const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewCard({ ...newCard, [name]: value });
    };

    const handleAddCard = async (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch('/api/user/${encodedEmail}/add-payment-card', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }),
            body: JSON.stringify(newCard),
        });

        if (response.ok) {
            const addedCard: Card = await response.json();
            setCards([...cards, addedCard]);
            setNewCard({ name: '', cardNumber: '', expiryMonth: '', expiryYear:'' , zipCode: '' }); // Reset form
        }
        // Add error handling as needed
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
            <form onSubmit={handleAddCard}>
              <div className="name block">
                  <label htmlFor="frm-name">Name on Payment Card</label>
                  <input 
                  onChange={handleInputChange}
                  id="inp"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  />
              </div>
              <div className="card-num block">
                  <label htmlFor="frm-card-num">Card Number</label>
                  <input
                  onChange={handleInputChange}
                  id="inp"
                  type="card-num"
                  name="text"
                  autoComplete="card-num"
                  required
                  />
              </div>
              <div className="card-info block">
                  <div>
                  <label htmlFor="frm-exp">Expiration Month</label>
                  <input
                      onChange={handleInputChange}
                      id="inp"
                      type="text"
                      name="exp"
                      autoComplete="exp"
                      required
                  />
                  </div>
                  <div className="card-info block">
                  <div>
                  <label htmlFor="frm-exp">Expiration Year</label>
                  <input
                      onChange={handleInputChange}
                      id="inp"
                      type="text"
                      name="exp"
                      autoComplete="exp"
                      required
                  />
                  </div>
                </div>
                <div>
                  <label htmlFor="frm-cvv">Zip Code</label>
                  <input
                      onChange={handleInputChange}
                      id="inp"
                      type="text"
                      name="cvv"
                      autoComplete="cvv"
                      required
                  />
                  </div>
              </div>
            </form>
            <div className="button block">
                <button type="submit">Add Card</button>
            </div>
        </div>
    );
}