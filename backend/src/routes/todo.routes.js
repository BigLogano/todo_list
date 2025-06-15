import express from "express";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  updateTodoById,
} from "../controller/todo.controller.js";

const router = express.Router();

router.post("/createTodo", createTodo);
router.get("/getAllTodos", getAllTodos);
router.put("/updateTodo/:id", updateTodoById);
router.delete("/deleteTodo/:id", deleteTodoById);
export default router;
