import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginuserIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await authServices.loginuserIntoDB(
      req.body.email,
      req.body.password,
    );
    return res.status(200).json({
      success: true,
      message: "user found",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = {
  loginuserIntoDB,
};
