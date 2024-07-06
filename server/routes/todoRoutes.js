import express from "express";
import {
  addTodoHandler,
  getAllTodosHandler,
  deleteTodoHandler,
  updateTodoHandler,
} from "./../controller/todoController.js";
import authMiddleware from "./../middleware/validateToken.js";

const router = express.Router();

router.post("/add", authMiddleware, addTodoHandler);
router.get("/all", authMiddleware, getAllTodosHandler);
router.put("/:id/update", authMiddleware, updateTodoHandler);
router.delete("/:id/delete", authMiddleware, deleteTodoHandler);

export default router;
