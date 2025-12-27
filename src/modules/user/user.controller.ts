import { Request, Response } from "express";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const result = await userServices.createUserIntoDb(req.body);

  try {
    return res.status(200).json({
      success: true,
      message: "user created",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

export const userController = {
  createUser,
};
