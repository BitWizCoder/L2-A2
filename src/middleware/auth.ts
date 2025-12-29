import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../database/db";

const auth = (...roles: string[]) => {
  console.log(roles);
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("You are not authorized!!");
    }

    const secret = "a-string-secret-at-least-256-bits-long";

    const decoded = jwt.verify(token, secret) as JwtPayload;
    console.log(decoded);

    const user = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [decoded.email],
    );

    if (user.rows.length === 0) {
      throw new Error("User's not found!!");
    }

    req.user = decoded;

    if (roles.length && !roles.includes(decoded.role)) {
      throw new Error("You are not authorized!!");
    }

    next();
  };
};

export default auth;
