// pages/api/search.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../db'; // Update the import path to where your database connection is

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { term } = req.query;
    if (!term || typeof term !== 'string') {
      res.status(400).json({ error: 'Search term must be provided' });
      return;
    }

    try {
      const results = await searchMovies(term);
      res.status(200).json(results);
    } catch (error) {
      console.error('Error searching movies:', error);
      res.status(500).json({ error: 'Error searching movies' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function searchMovies(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Use parameterized queries to prevent SQL injection
    const sqlQuery = 'SELECT * FROM movies WHERE title LIKE ?';
    connection.query(sqlQuery, [`%${query}%`], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}
