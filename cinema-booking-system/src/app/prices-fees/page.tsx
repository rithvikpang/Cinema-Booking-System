"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  isadmin: boolean;
  // Add other fields as they are defined in your database
}

const PriceFees: React.FC = () => {

  const [profile, setProfile] = useState<UserProfile>({
    isadmin: true,
  });

  const [token, setToken] = useState<string | null>();
  const [adultPrice, setAdultPrice] = useState<number>(0);
  const [childPrice, setChildPrice] = useState<number>(0);
  const [seniorPrice, setSeniorPrice] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
      const storedToken = localStorage.getItem('token');

      // If token exists, assign value to token
      if (storedToken) {
        setToken(storedToken);
      }

    const fetchPrices = async () => {  
      
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/unauth-page'); // Does not allow non-logged in users to access this page
        setError('No token found in localStorage');
        setLoading(false);
        return;
      }

      // Authorized restriction
      try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }

        const data: UserProfile = await response.json();
        setProfile(data);
        
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }

      try {
        const adultResponse = await fetch('http://localhost:8080/api/booking/get-ticket-price/ADULT', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!adultResponse.ok) {
          throw new Error(`Failed to fetch adult price: ${adultResponse.status} ${adultResponse.statusText}`);
        }
        const adultData = await adultResponse.json();
        setAdultPrice(adultData);

        const childResponse = await fetch('http://localhost:8080/api/booking/get-ticket-price/CHILD', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!childResponse.ok) {
          throw new Error(`Failed to fetch child price: ${childResponse.status} ${childResponse.statusText}`);
        }
        const childData = await childResponse.json();
        setChildPrice(childData);

        const seniorResponse = await fetch('http://localhost:8080/api/booking/get-ticket-price/SENIOR', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!seniorResponse.ok) {
          throw new Error(`Failed to fetch senior price: ${seniorResponse.status} ${seniorResponse.statusText}`);
        }
        const seniorData = await seniorResponse.json();
        setSeniorPrice(seniorData);

        const feeResponse = await fetch('http://localhost:8080/api/booking/get-ticket-price/FEE', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!feeResponse.ok) {
          throw new Error(`Failed to fetch fee: ${feeResponse.status} ${feeResponse.statusText}`);
        }
        const feeData = await feeResponse.json();
        setFee(feeData);

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    if (!profile.isadmin) {
      router.push("/unauth-page");
    }
  }, [profile.isadmin]);

  const handleAdultChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdultPrice(Number(value));
  };

  const handleChildChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setChildPrice(Number(value));
  };

  const handleSeniorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSeniorPrice(Number(value));
  };

  const handleFeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFee(Number(value));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found in localStorage');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/admin/update-ticket-price', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketType: "ADULT", newPrice: adultPrice }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update price: ${response.status} ${response.statusText}`);
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }

    try {
      const response = await fetch('http://localhost:8080/api/admin/update-ticket-price', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketType: "CHILD", newPrice: childPrice }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update price: ${response.status} ${response.statusText}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }

    try {
      const response = await fetch('http://localhost:8080/api/admin/update-ticket-price', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketType: "SENIOR", newPrice: seniorPrice }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update price: ${response.status} ${response.statusText}`);
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }

    try {
      const response = await fetch('http://localhost:8080/api/admin/update-ticket-price', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketType: "FEE", newPrice: fee }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update price: ${response.status} ${response.statusText}`);
      }

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }

    alert('Price updated successfully');


  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 
  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Prices & Fees</h1>
      <div className="adult-price block">
        <label htmlFor="adultPrice">Adult Ticket Price</label>
        <input
          id="adultPrice"
          type="text"
          name="adultPrice"
          value={adultPrice}
          onChange={handleAdultChange}
          required
        />
      </div>
      <div className="child-price block">
        <label htmlFor="adultPrice">Child Ticket Price</label>
        <input
          id="childPrice"
          type="text"
          name="childPrice"
          value={childPrice}
          onChange={handleChildChange}
          required
        />
      </div>
      <div className="senior-price block">
        <label htmlFor="adultPrice">Senior Ticket Price</label>
        <input
          id="seniorPrice"
          type="text"
          name="seniorPrice"
          value={seniorPrice}
          onChange={handleSeniorChange}
          required
        />
      </div>
      <div className="fee block">
        <label htmlFor="adultPrice">Fee</label>
        <input
          id="fee"
          type="text"
          name="fee"
          value={fee}
          onChange={handleFeeChange}
          required
        />
      </div>
      <div className="button block">
        <button type="submit">Save Changes</button>
      </div>
    </form>
  );
};
 
export default PriceFees;