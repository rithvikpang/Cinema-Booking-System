// pages/api/movies.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../db'; // Update the import path to where your database connection is

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const results = await fetchAllMovies();
      res.status(200).json(results);
    } catch (error) {
      console.error('Error fetching all movies:', error);
      res.status(500).json({ error: 'Error fetching all movies' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function fetchAllMovies(): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM movies', (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}
