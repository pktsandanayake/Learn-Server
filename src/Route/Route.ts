import express from "express";
import ToDoController from "../Controllers/ToDoController";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.json({ message: "Router working" });
});

router.get("/todos", ToDoController.getAllToDos);
router.get("/todo/:id", ToDoController.getToDo);
router.post("/todo", ToDoController.createToDo);
router.put("/todo/:id", ToDoController.updateToDo);
router.delete("/todo/:id", ToDoController.deleteToDo);

export default router;
