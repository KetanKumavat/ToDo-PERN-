import pool from "../db.js";

export const createUser = async (username, hashedPassword) => {
  const newUser = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, hashedPassword]
  );
  return newUser.rows[0];
};

export const findUserByUsername = async (username) => {
  const user = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return user.rows[0];
};
