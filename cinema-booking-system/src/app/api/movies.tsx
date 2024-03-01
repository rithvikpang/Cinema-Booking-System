import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { search } = req.query;
      const results = await searchMovies(search as string);
      console.log('Search successful:', results); // Log successful search
      res.status(200).json(results);
    } catch (error) {
      console.error('Error searching movies:', error);
      res.status(500).json({ error: 'Error searching movies' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function searchMovies(query: string): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM movies WHERE title LIKE ?', [`%${query}%`], (error, results, fields) => {
      if (error) {
        console.error('Error executing database query:', error);
        reject(error);
        return;
      }
      if (results.length > 0) {
        console.log('Search results found:', results.length); // Log the number of search results found
        resolve(results);
      } else {
        console.log('No search results found'); // Log message if no search results found
        resolve([]);
      }
    });
  });
}