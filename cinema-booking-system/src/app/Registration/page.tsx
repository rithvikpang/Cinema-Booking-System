import react from 'react';
/*
import { Form, Button } from 'react-bootstrap';
import RegisterContainer from '../Components/RegisterContainer';

const Register: React.FC = () => {
    const [formData, setFormData] = react.useState({
        firstname: "",
        lastname: "",
        age: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
*/

export default function Home() {
    return (
      <form className="container">
        <h1>Register</h1>
        <div className="first-name block">
          <label htmlFor="frm-first">First Name</label>
          <input
            id="frm-first"
            type="text"
            name="first"
            autoComplete="given-name"
            required
          />
        </div>
        <div className="last-name block">
          <label htmlFor="frm-last">Last Name</label>
          <input
            id="frm-last"
            type="text"
            name="last"
            autoComplete="family-name"
            required
          />
        </div>
        <div className="age block">
          <label htmlFor="frm-last">Age</label>
          <input
            id="from-age"
            type="text"
            name="age"
            autoComplete="age"
            required
          />
        </div>
        <div className="email block">
          <label htmlFor="frm-email">Email</label>
          <input
            id="frm-email"
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="address block">
          <label htmlFor="frm-email">Address</label>
          <input
            id="frm-address"
            type="address"
            name="text"
            autoComplete="address"
            required
          />
        </div>
        <div className="loc block">
          <div>
            <label htmlFor="frm-city">City</label>
            <input
              id="frm-city"
              type="text"
              name="city"
              autoComplete="city"
              required
            />
          </div>
          <div>
            <label htmlFor="frm-state">State</label>
            <input
              id="frm-state"
              type="text"
              name="state"
              autoComplete="state"
              required
            />
          </div>
          <div>
            <label htmlFor="frm-zip">Zip Code</label>
            <input
              id="frm-zip"
              type="text"
              name="zip"
              autoComplete="zip"
              required
            />
          </div>
        </div>
        <div className="password block">
          <label htmlFor="frm-last">Enter Password</label>
          <input
            id="from-password"
            type="text"
            name="password"
            autoComplete="password"
            required
          />
        </div>
        <div className="reenter password block">
          <label htmlFor="frm-last">Re-enter Password</label>
          <input
            id="from-password"
            type="text"
            name="reenter password"
            autoComplete="reenter password"
            required
          />
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
    <div className="card-info block"></div>
        <div>
          <label htmlFor="frm-exp">Expiration Date</label>
          <input
            id="frm-exp"
            type="text"
            name="exp"
            autoComplete="exp"
            required
          />
        </div>
        <div>
          <label htmlFor="frm-cvv">CVV</label>
          <input
            id="frm-cvv"
            type="text"
            name="cvv"
            autoComplete="cvv"
            required
          />
        </div>
        <div className="check-boxes">
          <div>
            <input type="checkbox" name="myCheckbox"/>
            <label>Register for Promotions</label>
          </div>
          <div>
            <input className="check" type="checkbox" name="myCheckbox"/>
            <label>Remember Me</label>
          </div>
        </div>
        <div className="cancel-save block">
          <div className="button block">
              <button type="submit">Cancel</button>
          </div>
          <div className="register-button block">
              <button type="submit">Register</button>
          </div>
        </div>
      </form>
    );
  }
    