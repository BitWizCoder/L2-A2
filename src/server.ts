import express, { Request, Response } from "express";
import { userRoute } from "./modules/user/user.route";
import { initDB } from "./database/db";

const app = express();
const port = 5000;
app.use(express.json());

initDB();

app.use("/api/v1/users", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root route.",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
