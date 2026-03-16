import { Request, Response } from "express";
import ToDo from "../Models/ToDo";

export default {
  async getAllToDos(_req: Request, res: Response) {
    const todos = await ToDo.find();
    res.json(todos);
  },

  async getToDo(req: Request, res: Response) {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) return res.status(404).json({ error: "Not found" });
    res.json(todo);
  },

  async createToDo(req: Request, res: Response) {
    const todo = await ToDo.create(req.body);
    res.status(201).json(todo);
  },

  async updateToDo(req: Request, res: Response) {
    const todo = await ToDo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) return res.status(404).json({ error: "Not found" });
    res.json(todo);
  },

  async deleteToDo(req: Request, res: Response) {
    const todo = await ToDo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  },
};
