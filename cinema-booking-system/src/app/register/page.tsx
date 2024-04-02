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
    if (formData.user.password.length < 6) {
      errors.user.password = "Password must be at least 6 characters long";
      isValid = false;
    }
  
    // Add more validations as needed...
  
    setFormErrors(errors); // Update the state with the errors found
    return isValid;
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      console.error("Validation failed");
      return;
    }

    // Adjusting to only include sections that are filled out
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
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Handle success scenario
        const data = await response.json();
        console.log("Registration successful", data);
        localStorage.setItem('token', data.token); // Adjust as needed
        router.push('/registration-confirmation'); // Redirect on success
      } else {
        // Handle error scenario
        console.error("Registration failed", await response.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Register</h1>
  
      <div className="form-section">
        <h2>User Information</h2>
        {/* Iterate over UserData fields */}
        {Object.entries(formData.user).map(([key, value]) => (
          <div key={key} className="input-group">
            <label htmlFor={`user.${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              id={`user.${key}`}
              type={key === 'password' ? 'password' : key === 'promotions' || key === 'rememberMe' ? 'checkbox' : 'text'}
              name={`user.${key}`}
              checked={key === 'promotions' || key === 'rememberMe' ? value : undefined}
              value={key === 'promotions' || key === 'rememberMe' ? undefined : value}
              onChange={handleChange}
              required={!(key === 'promotions' || key === 'rememberMe')}
            />
          </div>
        ))}
      </div>
  
      {/* Toggle for Payment Card Information */}
      <div className='sign-in button bloc'>
      <button type="submit" onClick={() => setShowPaymentCard(prev => !prev)}>
        {showPaymentCard ? "Remove Payment Card Information" : "Add Payment Card Information"}
      </button>
      </div>
  
      {showPaymentCard && (
        <div className="form-section">
          <h2>Payment Card Information</h2>
          {/* Iterate over PaymentCardData fields */}
          {formData.paymentCard && Object.entries(formData.paymentCard).map(([key, value]) => (
            <div key={key} className="input-group">
              <label htmlFor={`paymentCard.${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                id={`paymentCard.${key}`}
                type="text"
                name={`paymentCard.${key}`}
                value={value}
                onChange={handleChange}
              />
            
            </div>
          ))}
        </div>
      )}
  
      {/* Toggle for Billing Address */}
      <div className='sign-in button bloc'>
      <button type="submit" onClick={() => setShowBillingAddress(prev => !prev)}>
        {showBillingAddress ? "Remove Billing Address" : "Add Billing Address"}
      </button>
      </div>
  
      {showBillingAddress && (
        <div className="form-section">
          <h2>Billing Address</h2>
          {/* Iterate over BillingAddressData fields */}
          {formData.billingAddress && Object.entries(formData.billingAddress).map(([key, value]) => (
            <div key={key} className="input-group">
              <label htmlFor={`billingAddress.${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                id={`billingAddress.${key}`}
                type="text"
                name={`billingAddress.${key}`}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      )}
  
      <div className="sign-in button bloc">
        <button type="submit">Register</button>
      </div>
    </form>
  );
  
};

export default Home;
