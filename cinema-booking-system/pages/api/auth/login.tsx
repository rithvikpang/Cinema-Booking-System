import type { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_SIGNIN_URL = 'http://localhost:8080/api/auth/login';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Send the sign-in data to the Spring Boot backend for verification
      const backendResponse = await fetch(BACKEND_SIGNIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!backendResponse.ok) {
        // If the backend responds with an error, pass that error back to the client
        const errorResult = await backendResponse.json();
        res.status(backendResponse.status).json(errorResult);
        return;
      }

      // If sign-in is successful, you can handle the success response here
      const data = await backendResponse.json();
      res.status(200).json({ message: 'Sign-in successful', data: data });
    } catch (error) {
      // Handle errors with the network request to the backend
      console.error('Sign-in error:', error);
      res.status(500).json({ message: 'Error occurred during sign-in process' });
    }
  } else {
    // Respond with 405 if a non-POST method is used
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
