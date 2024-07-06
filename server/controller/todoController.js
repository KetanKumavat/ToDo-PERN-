import {
  addTodo,
  getTodosByUserId,
  deleteTodo,
  updateTodo,
  getTodoById,
} from "../models/todoModel.js";

export const addTodoHandler = async (req, res) => {
  try {
    const { description } = req.body;
    const userId = req.user;
    const newTodo = await addTodo(description, userId);
    res.json({ newTodo, message: "Task successfully added" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getAllTodosHandler = async (req, res) => {
  try {
    const userId = req.user;
    const todos = await getTodosByUserId(userId);
    res.json({ todos, message: "Fetched All Todos" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateTodoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await getTodoById(id);

    if (todo.user_id !== req.user) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this todo" });
    }

    const updatedTodo = await updateTodo(id, description);
    res.json({ updatedTodo, message: "Task successfully updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const deleteTodoHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await getTodoById(id);

    if (todo.user_id !== req.user) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this todo" });
    }

    await deleteTodo(id);
    res.json({ message: "Task successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
