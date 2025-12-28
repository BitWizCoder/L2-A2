import bcrypt from "bcryptjs";
import { pool } from "../../database/db";

const createUserIntoDb = async (payload: Record<string, unknown>) => {
  const { name, email, password } = payload;

  const hashPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING name, email, created_at, updated_at
    `,
    [name, email, hashPassword],
  );

  return result;
};

const getAllUserFromDb = async () => {
  const result = await pool.query(
    `
    SELECT id, name, email, age, created_at, updated_at FROM users
    `,
  );

  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUserFromDb,
};
