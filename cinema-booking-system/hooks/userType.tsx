import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  sub: string;
  isAdmin: boolean;
  exp: number;
  iat: number;
}

export const userType = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        setIsAdmin(decoded.isAdmin);
      } catch (error) {
        console.error("Error decoding token: ", error);
        setIsAdmin(null);
      }
    }
  }, []);

  return { isAdmin };
};