import { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Query the database to test the connection
    connection.query('SELECT 1 + 1 AS result', (error, results, fields) => {
      if (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Error querying database' });
        return;
      }
      console.log('Database connection test successful:', results[0].result);
      res.status(200).json({ message: 'Database connection test successful' });
    });
  } catch (error) {
    console.error('Error testing database connection:', error);
    res.status(500).json({ error: 'Error testing database connection' });
  }
}