/*
import { createPool, Pool } from 'mysql2/promise';

const pool: Pool = createPool({
  host: 'swe.cly0og6cqjm0.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'nikmannik',
  password: 'nikmannik',
  database: 'Cinema DB',
  connectionLimit: 10 // Adjust according to your requirements
});

export default pool;
*/

import mysql, { Connection } from 'mysql';

// Establish MySQL connection
const connection: Connection = mysql.createConnection({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export default connection;