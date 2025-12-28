import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../database/db";

const loginuserIntoDB = async (email: string, password: string) => {
  const user = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
      `,
    [email],
  );

  if (user.rows.length === 0) {
    throw new Error("User not found!!");
  }

  const matchPasword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchPasword) {
    throw new Error("Invalid Credentials!!");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };

  const secret = "a-string-secret-at-least-256-bits-long";

  const token = jwt.sign(jwtPayload, secret, { expiresIn: "7d" });

  return { token, user: user.rows[0] };
};

export const authServices = {
  loginuserIntoDB,
};
