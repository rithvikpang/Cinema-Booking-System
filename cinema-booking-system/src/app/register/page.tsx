// Assuming this file is located at: src/app/registration/page.tsx
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormData {
  firstname: string;
  lastname: string;
  age: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  password: string;
  confirmPassword: string;
  promotions: boolean; // For "Register for Promotions" checkbox
  rememberMe: boolean; // For "Remember Me" checkbox
}

const initialState: FormData = {
  firstname: "",
  lastname: "",
  age: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  password: "",
  confirmPassword: "",
  promotions: false,
  rememberMe: false,
};

const Home = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = (): boolean => {
    let errors: Partial<FormData> = {};
    let isValid = true;

    // Example validation
    if (!formData.firstname.trim()) {
      isValid = false;
      errors.firstname = "First Name is required";
    }

    if (!formData.email.includes('@')) {
      isValid = false;
      errors.email = "Email is invalid";
    }

    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      console.error("Validation failed");
      return;
    }
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Handle success
        const data = await response.json();

        localStorage.setItem('token', data.data.token); // Store the JWT in localStorage
        console.log("Registration successful", data);
        // Redirect or show a success message
        // e.g., router.push('/registration-success');
      } else {
        // Handle server errors
        const errorData = await response.json();
        console.error("Registration failed", errorData.message);
        // Show error messages to the user
      }

      router.push('/registration-confirmation');

    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network errors
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container">
  <h1>Register</h1>
  <h4>* = required</h4>

  {/* First Name */}
  <div className="first-name block">
    <label htmlFor="frm-first">First Name*</label>
    <input
      id="inp"
      type="text"
      name="firstname"
      value={formData.firstname}
      onChange={handleChange}
      required
    />
    {formErrors.firstname && <p className="error">{formErrors.firstname}</p>}
  </div>

  {/* Last Name */}
  <div className="last-name block">
    <label htmlFor="frm-last">Last Name*</label>
    <input
      id="inp"
      type="text"
      name="lastname"
      value={formData.lastname}
      onChange={handleChange}
      required
    />
    {formErrors.lastname && <p className="error">{formErrors.lastname}</p>}
  </div>

  {/* Age */}
  <div className="age block">
    <label htmlFor="from-age">Age*</label>
    <input
      id="inp"
      type="text"
      name="age"
      value={formData.age}
      onChange={handleChange}
      required
    />
    {formErrors.age && <p className="error">{formErrors.age}</p>}
  </div>

  {/* Email */}
  <div className="email block">
    <label htmlFor="frm-email">Email*</label>
    <input
      id="inp"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
    {formErrors.email && <p className="error">{formErrors.email}</p>}
  </div>

  {/* Address */}
  <div className="address block">
    <label htmlFor="frm-address">Address*</label>
    <input
      id="inp"
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      required
    />
    {formErrors.address && <p className="error">{formErrors.address}</p>}
  </div>

  {/* City */}
  <div className="block">
    <label htmlFor="frm-city">City*</label>
    <input
      id="inp"
      type="text"
      name="city"
      value={formData.city}
      onChange={handleChange}
      required
    />
    {formErrors.city && <p className="error">{formErrors.city}</p>}
  </div>

  {/* State */}
  <div className="block">
    <label htmlFor="frm-state">State*</label>
    <input
      id="inp"
      type="text"
      name="state"
      value={formData.state}
      onChange={handleChange}
      required
    />
    {formErrors.state && <p className="error">{formErrors.state}</p>}
  </div>

  {/* Zip Code */}
  <div className="block">
    <label htmlFor="frm-zip">Zip Code*</label>
    <input
      id="inp"
      type="text"
      name="zip"
      value={formData.zip}
      onChange={handleChange}
      required
    />
    {formErrors.zip && <p className="error">{formErrors.zip}</p>}
  </div>

  {/* Password */}
  <div className="password block">
    <label htmlFor="frm-password">Enter Password*</label>
    <input
      id="inp"
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />
    {formErrors.password && <p className="error">{formErrors.password}</p>}
  </div>

  {/* Re-enter Password */}
  <div className="block">
    <label htmlFor="frm-confirmPassword">Re-enter Password*</label>
    <input
      id="inp"
      type="password"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      required
    />
    {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
  </div>

  {/* Additional Fields as Needed... */}

<div className="check-boxes">
  {/* Register for Promotions */}
  <label>
    <input
      type="checkbox"
      name="promotions"
      checked={formData.promotions}
      onChange={handleChange} // Reuse the existing handleChange function
    /> Register for Promotions
  </label>

  {/* Remember Me */}
  <label>
    <input
      type="checkbox"
      name="rememberMe"
      checked={formData.rememberMe}
      onChange={handleChange} // Reuse the existing handleChange function
    /> Remember Me
  </label>
</div>
  
  <div className="register-button block">
    <button type="submit">Register</button>
  </div>
</form>

  );
};

export default Home;
