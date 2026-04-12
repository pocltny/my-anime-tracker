import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // ใช้ Number() ครอบเพื่อป้องกัน Error จาก Vercel
  port: Number(process.env.DB_PORT) || 4000, 
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});