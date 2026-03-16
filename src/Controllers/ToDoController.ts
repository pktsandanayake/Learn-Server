import { Request, Response } from "express";
import ToDo from "../Models/ToDo";

export default {
  async getAllToDos(_req: Request, res: Response) {
    const todos = await ToDo.find();
    res.json(todos);
  },
};
