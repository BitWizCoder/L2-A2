import express, { Request, Response } from "express";
import { initDB } from "./database/db";
import { userRoute } from "./modules/user/user.route";
import { authRoute } from "./modules/auth/auth.route";

const app = express();
const port = 5000;
app.use(express.json());

initDB();

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root route.",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
