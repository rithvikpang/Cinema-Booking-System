// Assuming this file is located at: src/app/registration/page.tsx
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Adjusted import for next/router

interface UserData {
  firstname: string;
  lastname: string;
  age: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  password: string;
  promotions: boolean;
  rememberMe: boolean;
}

interface PaymentCardData {
  cardholderName: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
}

interface BillingAddressData {
  addressLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

interface RegisterData {
  user: UserData;
  paymentCard?: PaymentCardData; // Make these optional
  billingAddress?: BillingAddressData;
}

const initialState: RegisterData = {
  user: {
    firstname: "",
    lastname: "",
    age: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    password: "",
    promotions: false,
    rememberMe: false,
  },
  // Initially, these are not part of the state unless added by the user
};

const Home = () => {
  const [formData, setFormData] = useState<RegisterData>(initialState);
  const [formErrors, setFormErrors] = useState<Partial<RegisterData>>({});
  const [showPaymentCard, setShowPaymentCard] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    const [section, field] = name.split(".");

    if(section === "user" || section === "paymentCard" || section === "billingAddress") {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value,
        },
      }));
    }
  };

  // Example validation logic, should be expanded as per your form requirements
  const validateForm = () => {
    let errors: RegisterData = { ...initialState }; // Initialize errors with empty values
    let isValid = true;
  
    // Validate user information
    if (!formData.user.firstname.trim()) {
      errors.user.firstname = "First name is required";
      isValid = false;
    }
  
    // Example: Validate email format
    if (!/\S+@\S+\.\S+/.test(formData.user.email)) {
      errors.user.email = "Email is invalid";
      isValid = false;
    }
  
    // Example: Validate password length
    if (formData.user.password.length < 4) {
      errors.user.password = "Password must be at least 6 characters long";
      isValid = false;
    }
  
    // Add more validations as needed...
  
    setFormErrors(errors); // Update the state with the errors found
    return isValid;
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Ensure form validation is passed before proceeding
    if (!validateForm()) {
      console.error("Validation failed");
      return;
    }
  
    // Adjusting payload to include only sections that are filled out
    const payload = {
      user: formData.user,
      ...(showPaymentCard && { paymentCard: formData.paymentCard }),
      ...(showBillingAddress && { billingAddress: formData.billingAddress }),
    };
  
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Use the adjusted payload
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Assuming `data.data.token` is the correct path to the token in the response
        // localStorage.setItem('token', data.data.token); // Store the JWT in localStorage
        console.log("Registration successful", data);
  
        // Redirect or show a success message
        router.push('/registration-confirmation'); // Adjust as necessary for your application
      } else {
        // Handle server errors
        const errorData = await response.json();
        console.error("Registration failed", errorData.message);
        // Optionally, show error messages to the user
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network errors
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Register</h1>

      <div>
        <h2>User Information</h2>
        <div className="input-group">
          <label htmlFor="user.firstname">First Name</label>
          <input
            id="user.firstname"
            type="text"
            name="user.firstname"
            value={formData.user.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="user.lastname">Last Name</label>
          <input
            id="user.lastname"
            type="text"
            name="user.lastname"
            value={formData.user.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="user.age">Age</label>
          <input
            id="user.age"
            type="text"
            name="user.age"
            value={formData.user.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="user.email">Email</label>
          <input
            id="user.email"
            type="email"
            name="user.email"
            value={formData.user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="user.address">Address</label>
          <input
            id="user.address"
            type="text"
            name="user.address"
            value={formData.user.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="user.city">City</label>
          <input
            id="user.city"
            type="text"
            name="user.city"
            value={formData.user.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="user.state">State</label>
          <input
            id="user.state"
            type="text"
            name="user.state"
            value={formData.user.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="user.zip">Zip</label>
          <input
            id="user.zip"
            type="text"
            name="user.zip"
            value={formData.user.zip}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="user.password">Password</label>
          <input
            id="user.password"
            type="password"
            name="user.password"
            value={formData.user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>
            <input
              type="checkbox"
              name="user.promotions"
              checked={formData.user.promotions}
              onChange={handleChange}
            /> Sign up for promotions?
          </label>
        </div>

        <div className="input-group">
          <label>
            <input
              type="checkbox"
              name="user.rememberMe"
              checked={formData.user.rememberMe}
              onChange={handleChange}
            /> Remember me
          </label>
        </div>
      </div>

      {/* Add buttons for toggling payment card and billing address information */}
      {/* Add the rest of the form for payment card and billing address based on the showPaymentCard and showBillingAddress state */}

      <div className="button block">
        <button type="button" onClick={() => setShowPaymentCard(!showPaymentCard)}>
          {showPaymentCard ? 'Hide Payment Card Information' : 'Add Payment Card Information'}
        </button>
        {showPaymentCard && (
          <div className="payment-card-section">
            <h2>Payment Card Information</h2>
            {/* Payment Card Inputs */}
            <label htmlFor="cardholderName">Cardholder Name:</label>
            <input
              type="text"
              id="cardholderName"
              name="paymentCard.cardholderName"
              onChange={handleChange}
              // Add other props as needed
            />
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="paymentCard.cardNumber"
              onChange={handleChange}
              // Add other props as needed
            />
            <label htmlFor="expiryMonth">Expiration Month:</label>
            <input
              type="text"
              id="expiryMonth"
              name="paymentCard.expiryMonth"
              onChange={handleChange}
              // Add other props as needed
            />
            <label htmlFor="expiryYear">Expiration Year:</label>
            <input
              type="text"
              id="expiryYear"
              name="paymentCard.expiryYear"
              onChange={handleChange}
              // Add other props as needed
            />
          </div>
        )}
      </div>

      <div className="button block">
        <button type="button" onClick={() => setShowBillingAddress(!showBillingAddress)}>
          {showBillingAddress ? 'Hide Billing Address' : 'Add Billing Address'}
        </button>
        {showBillingAddress && (
          <div className="billing-address-section">
            <h2>Billing Address</h2>
            {/* Billing Address Inputs */}
            <label htmlFor="addressLine">Address Line:</label>
            <input
              type="text"
              id="addressLine"
              name="billingAddress.addressLine"
              onChange={handleChange}
              // Add other props as needed
            />
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="billingAddress.city"
              onChange={handleChange}
              // Add other props as needed
            />
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="billingAddress.state"
              onChange={handleChange}
              // Add other props as needed
            />
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              type="text"
              id="zipCode"
              name="billingAddress.zipCode"
              onChange={handleChange}
              // Add other props as needed
            />
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="billingAddress.country"
              onChange={handleChange}
              // Add other props as needed
            />
          </div>
        )}
      </div>

      {/* Submission button */}
      <div className="left-button block">
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default Home;