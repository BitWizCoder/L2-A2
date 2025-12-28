import { NextFunction, Request, Response } from "express";

const verify = (req: Request, res: Response, next: NextFunction) => {
  console.log("Bhai wait id card anchen?");
};

export default verify;
