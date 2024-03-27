import type { NextApiRequest, NextApiResponse } from 'next';

interface RegisterData {
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
  isAdmin: boolean;
}

const BACKEND_REGISTRATION_URL = 'http://localhost:8080/api/registration';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const formData: RegisterData = req.body;

    try {
      const backendResponse = await fetch(BACKEND_REGISTRATION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!backendResponse.ok) {
        const contentType = backendResponse.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorResult = await backendResponse.json();
          res.status(backendResponse.status).json(errorResult);
        } else {
          const errorText = await backendResponse.text();
          console.error('Registration failed:', errorText);
          res.status(backendResponse.status).send(errorText);
        }
        return;
      }

      const data = await backendResponse.json();
      res.status(200).json({ message: 'Registration successful', data: data });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error occurred while processing registration' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
