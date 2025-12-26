import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

const app = express();
const port = 5000;
app.use(express.json());

dotenv.config({ path: path.join(process.cwd(), ".env") });

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

const initDB = async () => {
  await pool.query(/* SQL */ `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    age INT, 
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
  console.log("Database Connected");
};

initDB();

app.post("/users", async (req, res) => {
  const body = req.body;

  res.status(200).json({
    message: body,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root route.",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
