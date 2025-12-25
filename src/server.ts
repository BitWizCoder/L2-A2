import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = 5000;
app.use(express.json());

const pool = new Pool();

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
