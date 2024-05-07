"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from "next/link"
import { Router } from 'next/router';

interface Card {
    cardNumber: string;
    id: number
}

interface NewCardDetails {
  cardholderName: string;
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  zipCode: string;
  cvv: number;
}

export default function Home() {
    
    const [cards, setCards] = useState<Card[]>([]);
    const [newCard, setNewCard] = useState<NewCardDetails>({ cardholderName: '', cardNumber: '', expiryMonth: 0, expiryYear: 0, zipCode: '', cvv: 0 });
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
          const token = localStorage.getItem('token'); // Retrieve the stored JWT token
          if (!token) {
            console.error('No token found in localStorage');
            return;
          }
          const response = await fetch('http://localhost:8080/api/user/profile', {
            headers: new Headers({
              'Authorization': `Bearer ${token}`,
            }),
          });
          if (response.ok) {
            const data = await response.json();
            setEmail(data.email);
            fetchCards(data.email);
          }
        };
        
        fetchProfile();
      }, []);

      const fetchCards = async (email: string) => {
        const response = await fetch(`http://localhost:8080/api/user/${email}/get-payment-cards`);
      
        if (!response.ok) {
          console.error('Failed to fetch cards:', response.status);
          return;
        }
      
        try {
          const data: Card[] = await response.json();
          setCards(data);
        } catch (error) {
          console.error('Error parsing server response:', error);
        }
      };

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
        const response = await fetch(`http://localhost:8080/api/user/${email}/add-payment-card`, {
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
            setNewCard({ cardholderName: '', cardNumber: '', expiryMonth: 0, expiryYear: 0, zipCode: '', cvv: 0 }); // Reset form
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
                  <label htmlFor="frm-name">Cardholder Name</label>
                  <input 
                  onChange={handleInputChange}
                  id="inp"
                  type="text"
                  name="cardholderName"
                  autoComplete="name"
                  required
                  />
              </div>
              <div className="card-num block">
                  <label htmlFor="frm-card-num">Card Number</label>
                  <input
                  onChange={handleInputChange}
                  id="inp"
                  type="text"
                  name="cardNumber"
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
                      type="number"
                      name="expiryMonth"
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
                      type="number"
                      name="expiryYear"
                      autoComplete="exp"
                      required
                  />
                  </div>
                </div>
                <div>
                  <label htmlFor="frm-zip">Zip Code</label>
                  <input
                      onChange={handleInputChange}
                      id="inp"
                      type="text"
                      name="zipCode"
                      autoComplete="zip"
                      required
                  />
                  </div>
                <div>
                  <label htmlFor="frm-cvv">CVV</label>
                  <input
                      onChange={handleInputChange}
                      id="inp"
                      type="number"
                      name="cvv"
                      autoComplete="cvv"
                      required
                  />
                  </div>
              </div>
              <div className="button block">
                <button onClick={handleAddCard}>Add Card</button>
              </div>
            </form>
        </div>
    );
}