import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

export const initDB = async () => {
  // User
  await pool.query(/* SQL */ `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(250) NOT NULL,
    role VARCHAR(100) NOT NULL,
    age INT, 
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

  // Vehicles
  await pool.query(/* SQL */ `
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(250) NOT NULL,
    type VARCHAR(250),
    registration_number INT UNIQUE NOT NULL ,
    daily_rent_price INT NOT NULL CHECK (daily_rent_price > 0),
    availability_status VARCHAR(250)
    )
    `);

  // Bookings
  await pool.query(/* SQL */ `
    CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL PRIMARY KEY,
    )
    `);
};
