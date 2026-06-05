import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [rows] = await connection.query("SELECT 1 + 1 AS result");

    console.log("MySQL Connected Successfully:", rows);

    await connection.end();
  } catch (error) {
    console.error("MySQL Connection Failed:", error.message);
  }
}

testConnection();
