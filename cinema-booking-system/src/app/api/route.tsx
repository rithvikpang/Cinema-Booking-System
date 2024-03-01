/*
import mysql from 'mysql2/promise';

export default async function handler(req, res) {

    const dbconnection  = await mysql.createConnection({
        host: 'swe.cly0og6cqjm0.us-east-1.rds.amazonaws.com',
        port: 3306,
        user: 'nikmannik',
        password: 'nikmannik',
        database: 'cinema_db',
        connectionLimit: 10 // Adjust according to your requirements
      });
      try {
        const query  = "SELECT title FROM movies";
        const values: any[] = [];
        const [results] = await dbconnection.execute(query, values);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch search results' });
      }
*/

import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../db';

// Example GET request handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const data = await fetchDataFromDatabase();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

async function fetchDataFromDatabase() {
  return new Promise((resolve, reject) => {
    // Example query
    connection.query('SELECT title FROM movies', (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}