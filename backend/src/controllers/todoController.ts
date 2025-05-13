import { Request, Response } from "express";
import { Todo } from "../models/todoModel";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json(todos);
};

export const addTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  const todo = new Todo({ title });
  await todo.save();
  res.status(201).json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json({ message: "Todo deleted" });
};

