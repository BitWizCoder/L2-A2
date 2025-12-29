import bcrypt from "bcryptjs";
import { pool } from "../../database/db";

const createUserIntoDb = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashPassword = await bcrypt.hash(password as string, 12);

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING name, email, phone, role, created_at, updated_at
    `,
    [name, email, hashPassword, phone, role],
  );

  return result;
};

const getAllUserFromDb = async () => {
  const result = await pool.query(
    `
    SELECT id, name, email, phone, age, created_at, updated_at FROM users
    `,
  );

  return result;
};

const getSingleUserFromDb = async (email: string) => {
  const result = await pool.query(
    `
    SELECT id, name, email, age, created_at, updated_at FROM users WHERE email=$1
    `,
    [email],
  );

  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDb,
};
