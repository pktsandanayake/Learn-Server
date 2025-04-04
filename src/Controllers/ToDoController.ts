import express from "express";
import { ToDoModel } from "../DB/ToDo";
import status from "../enums/status";
class ToDoController {
  getAllToDos = async (req: express.Request, res: express.Response) => {
    try {
      const todos = await ToDoModel.find();
      return res.json(todos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  getToDo = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const todo = await ToDoModel.findById(id);
      return res.json(todo);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  getToDoByDate = async (req: express.Request, res: express.Response) => {
    try {
      const { date } = req.params;
      const todos = await ToDoModel.find({
        date: date,
      });
      return res.json(todos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  getToDosByDependency = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { dependancy } = req.body;
      const todos = await ToDoModel.find({
        _id: dependancy,
        status: status.NotDone,
      });
      return res.json(todos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  getToDosByFilter = async (req: express.Request, res: express.Response) => {
    try {
      const { priority, status, title, interval } = req.params;
      console.log("priority:", priority, "status:", status, "title:", title);

      const Where =
        title == "NoTitle"
          ? {
              priority: priority,
              status: status,
            }
          : {
              priority: priority,
              status: status,
              title: { $regex: title },
            };
      console.log("Where", Where);
      const todos = await ToDoModel.find(Where);
      return res.json(todos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
  createToDo = async (req: express.Request, res: express.Response) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.sendStatus(400);
      }
      const todo = await ToDoModel.collection.insertOne(req.body);

      return res.json({ message: "Todo has been created", todo });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  createToDos = async (req: express.Request, res: express.Response) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.sendStatus(400);
      }
      const todos = await ToDoModel.collection.insertMany(req.body);

      return res.json({ message: "Todo has been created", todos });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  updateToDo = async (req: express.Request, res: express.Response) => {
    try {
      if (Object.keys(req.body).length === 0) {
        return res.sendStatus(400);
      }
      const { id } = req.params;
      const { date, title, status, priority, dependancy } = req.body;

      const todo = await ToDoModel.findById(id);
      if (todo) {
        todo.date = date;
        todo.title = title;
        todo.status = status;
        todo.priority = priority;
        todo.dependancy = dependancy;
        await todo.save();
        return res.json({ todo });
      }

      return res.sendStatus(400);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  deleteToDo = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      await ToDoModel.findByIdAndDelete({ _id: id });
      return res.json({ message: "record deleted" });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  deleteToDos = async (req: express.Request, res: express.Response) => {
    try {
      const todos = await ToDoModel.collection.deleteMany();
      return res.json({ message: "All record deleted" });
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };
}

export default new ToDoController();
