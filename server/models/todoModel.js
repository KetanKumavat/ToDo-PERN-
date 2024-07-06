import pool from "../db.js";

export const addTodo = async (description, userId) => {
  const newTodo = await pool.query(
    "INSERT INTO todo (description, user_id) VALUES ($1, $2) RETURNING *",
    [description, userId]
  );
  return newTodo.rows[0];
};

export const getTodosByUserId = async (userId) => {
  const todos = await pool.query("SELECT * FROM todo WHERE user_id = $1", [
    userId,
  ]);
  return todos.rows;
};

export const deleteTodo = async (id) => {
  await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
};

export const updateTodo = async (id, description) => {
  const updatedTodo = await pool.query(
    "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
    [description, id]
  );
  return updatedTodo.rows[0];
};

export const getTodoById = async (id) => {
  const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
  return todo.rows[0];
};
